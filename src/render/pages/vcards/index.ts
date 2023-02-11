import { IApplicationData, IVcardForm, IVcardCompanyForm, IVcardEmployeeForm, IImgFileDesc } from "../../../types";
import { getPointers } from "./pointers.js";
import { vcardsAddDataRow } from "./dataRow.js";
import { getInputValue, setInputValue } from "../_shared/inputs.js";
import { svgToPng, getBase64String } from "../_shared/image.js";

interface IRowVcardForm extends IVcardForm {
  rowi: string;
}
interface IRowVcardEmployeeForm extends IVcardEmployeeForm {
  rowi: string;
}
export const vcardsEmployeeRowSelector = `tr[data-is-employee-row=true]`;

export function init(/* window: Window, document: Document */): void {
  vcardsAddDataRow();
  window.dataapi.handleMenuAppDataSave(
    vcardsDataDownloadHandler
  );
  window.applyData = applyAppData;
  addPageEventListeners();
}

export function addPageEventListeners(): void {
  try {
    const pointers = getPointers(/* document */);
    const { vcardsGenBtn, vcardsAddRowBtn, vcardsSelectAll, vcardsDldBtn, vcardsdataloadbtn, vcardsdatadownloadbtn } = pointers;
    vcardsAddRowBtn.addEventListener(`click`, vcardsAddDataRow);
    vcardsSelectAll.addEventListener(`change`, vcardsHandlerSelectDeselectAll);
    vcardsGenBtn.addEventListener(`click`, vcardsGenHandler);
    vcardsDldBtn.addEventListener(`click`, vcardsDownloadManyHandler);
    vcardsdataloadbtn.addEventListener(`click`, vcardsDataLoadHandler);
    vcardsdatadownloadbtn.addEventListener(`click`, vcardsDataDownloadHandler);
  } catch (err) {
    console.log(`Cannot add page listeners: ${err.message}`);
  }
}

function vcardsHandlerSelectDeselectAll() {
  const { vcardsSelectAll } = getPointers(/* document */);
  Array.from(document.querySelectorAll(`#contents .data-row-selector`))
    .forEach((cb: HTMLInputElement) => cb.checked = vcardsSelectAll.checked);
}

function getVcardsCompanyFormData(appData: IApplicationData): IApplicationData["company"] {
  return appData.company_form_fields.reduce((o: IVcardCompanyForm, fn: keyof IVcardCompanyForm) => {
    o[fn] = getInputValue(`vc-${fn}`);
    return o;
  }, {} as IVcardCompanyForm);
}

type EmployeeDataType<B extends true | false | undefined> = B extends true
  ? IVcardEmployeeForm
  : IRowVcardEmployeeForm;

function getVcardsEmployeesFormData<B extends true | false | undefined>(appData: IApplicationData, options?: { asIVcardEmployeeForm?: B }): EmployeeDataType<B>[] {
  const returnAsIVcardEmployeeForm = options?.asIVcardEmployeeForm === true;
  const resultVEF: IVcardEmployeeForm[] = [];
  const resultRVEF: IRowVcardEmployeeForm[] = [];
  const datarows = Array.from(document.querySelectorAll(`#contents .data-row-selector`)) as HTMLElement[];
  const requiredFields = appData.vcard_required_fields
    .filter(fieldName => appData.employee_form_fields.includes(fieldName as unknown as keyof IVcardEmployeeForm));
  for (const datarow of datarows) {
    const rowi = datarow.dataset.row;
    const getVcInputValue = (fieldName: string) => getInputValue(`vc-${rowi}-${fieldName}`);
    const employeeData = appData.employee_form_fields.reduce((o: IVcardEmployeeForm, fieldName: keyof IVcardEmployeeForm) => {
      o[fieldName] = getVcInputValue(fieldName);
      return o;
    }, {} as IVcardEmployeeForm);

    if (requiredFields
      .some((fieldName: keyof IVcardEmployeeForm) => !employeeData[fieldName])
    ) {
      window.userMessage(`Employee ${rowi} form incomplete: Missing ${requiredFields
        .filter((fieldName: keyof IVcardEmployeeForm) => !employeeData[fieldName])
        .join(`, `)
        } `);
      throw new TypeError(`Employee ${rowi} vcard form Incomplete`);
    }
    const asIRowVcardEmployeeForm = () => ({
      rowi,
      ...employeeData
    }) as IRowVcardEmployeeForm;

    if (returnAsIVcardEmployeeForm)
      resultVEF.push(employeeData);
    else
      resultRVEF.push(asIRowVcardEmployeeForm());
  }
  return (returnAsIVcardEmployeeForm ? resultVEF : resultRVEF) as EmployeeDataType<B>[];
}

function getVcardsFormData(appData: IApplicationData): IRowVcardForm[] {
  console.log(`get vcards form data`);
  const data: IRowVcardForm[] = [];
  const companyData = getVcardsCompanyFormData(appData);
  const employeeRowData = getVcardsEmployeesFormData<false>(appData);
  data.push(...employeeRowData.map(v => ({ ...v, ...companyData })));
  console.log(`got ${data.length} rows`);
  return data;
}

async function generateAndStoreQr(rowi: string, data: string) {
  console.log(`gen and store qr`);
  const qrdisplaycontainer = document.querySelector(`#contents #qr-${rowi}`);
  const qrdisplay = document.querySelector(`#contents #qrdisplay-${rowi}`);
  const { vcardsDldBtn } = getPointers(/* document */);

  qrdisplay.innerHTML = ``;
  const { svg, width, height } = await window.qrapi.qrcodesvg(data);
  // console.log(`qrcodesvg returned ${width} & ${height}`);
  qrdisplaycontainer.setAttribute(`viewBox`, `0 0 ${width} ${height}`);
  qrdisplay.innerHTML = svg;
  // setDownloadButtonBlob();
  vcardsDldBtn.removeAttribute(`disabled`);
}

async function vcardsGenHandler() {
  console.log(`vcards generate button clicked`);
  const appData = await window.dataapi.getappdata();
  const formObjects = getVcardsFormData(appData);
  for (const o of formObjects) {
    const vcard = await window.vcardapi.vcard(o);
    generateAndStoreQr(o.rowi, vcard);
  }
}

function getSelectedVcardsRows(): HTMLElement[] {
  // list selected rows
  const { vcardsSelectAll, vcardsTable } = getPointers(/* document */);
  let tableRows = Array.from(vcardsTable.querySelectorAll(vcardsEmployeeRowSelector) as unknown as HTMLElement[]);
  if (!vcardsSelectAll.checked) {
    tableRows = tableRows.filter(tr => (tr.querySelector(`input[type=checkbox]`) as HTMLInputElement)?.checked);
  }
  return tableRows;
}

async function getImageFromRow(row: HTMLElement): Promise<IImgFileDesc> {
  const rowi = row.dataset.row;
  const surname = encodeURI((row.children[2].firstChild as HTMLInputElement).value);
  const filename = `${String(rowi).padStart(3, `0`)} - ${surname}.png`;
  const svg = row.querySelector(`#qr-${rowi}`) as SVGAElement;
  const dataUrl = await svgToPng(svg);
  const data = getBase64String(dataUrl);
  return { filename, data };
}

async function vcardsDownloadManyHandler() {
  console.log(`download many qr clicked`);
  const { ziplink } = getPointers(/* document */);
  const rows = getSelectedVcardsRows();
  if (!rows.length) {
    console.log(`No qr selected`);
    window.userMessage(`No row selected.`);
    return;
  }
  const imageDescs: IImgFileDesc[] = await Promise.all(rows.map(getImageFromRow));
  const zip = await window.zipapi.zipimages(imageDescs);
  ziplink.download = `qrcodes.zip`;
  ziplink.href = URL.createObjectURL(new Blob([zip]));
  ziplink.click();
}

async function applyAppData() {
  const { vcardsTable } = getPointers(/* document */);
  // get app data
  const { company, employee_data, company_form_fields } = await window.dataapi.getappdata();
  // set company form data
  company_form_fields.forEach((f) => {
    setInputValue(`vc-${f}`, company[f]);
  }, {});
  // clear employee data form
  Array.from(vcardsTable.querySelectorAll(vcardsEmployeeRowSelector)).forEach(tr => tr.remove());
  // add employee data
  for (const dataRow of employee_data)
    await vcardsAddDataRow(undefined, dataRow);
}

async function vcardsDataLoadHandler() {
  await window.dataapi.loaddata();
  window.userMessage(`Data loaded`);
  applyAppData();
}

async function vcardsDataDownloadHandler() {
  const appData = await window.dataapi.getappdata();
  const companyData = getVcardsCompanyFormData(appData);
  const employeeData = getVcardsEmployeesFormData(appData, { asIVcardEmployeeForm: true });
  await window.dataapi.setappdata({
    company: companyData,
    employee_data: employeeData
  });
  // const updatedAppData = await window.dataapi.getappdata();
  await window.dataapi.saveappdata();
}