const pageContentDiv = document.getElementById(`contents`);
// Common
function getPointers() {
    const qrdisplaycontainer = document.querySelector(`#contents #qrdisplaycontainer`) as unknown as SVGAElement;
    const qrgenbtn = document.querySelector('#contents #qrgenbtn');
    const vcardqrgenbtn = document.querySelector('#contents #vcardqrgenbtn');
    const qrdldbtn = document.querySelector('#contents #qrdldbtn');
    const qrlink = document.querySelector('#contents #qrdldlink') as HTMLAnchorElement;
    const qrdisplay = document.querySelector(`#contents #qrdisplay`);
    const qrdata = document.querySelector(`#contents #qrdata`) as HTMLInputElement;
    const vcardsTable = document.querySelector(`#contents #vcards-employee-data`);
    const vcardsAddRowBtn = document.querySelector(`#contents #vcards-add-data-row-btn`);
    const vcardsGenBtn = document.querySelector(`#contents #vcardsgenbtn`);
    const vcardsDldBtn = document.querySelector(`#contents #vcardsdldbtn`);
    const vcardsSelectAll = document.querySelector(`#contents #vcardsall`) as HTMLInputElement;
    return {
        qrdata,
        qrdisplaycontainer,
        qrdisplay,
        qrdldbtn,
        qrgenbtn,
        qrlink,
        vcardqrgenbtn,
        vcardsAddRowBtn,
        vcardsDldBtn,
        vcardsGenBtn,
        vcardsSelectAll,
        vcardsTable
    }
}
function getInputValue(id: string): string | undefined {
    const i = document.querySelector(`#contents #${id}`) as HTMLInputElement;
    return i?.value;
}
function userMessage(text: string) {
    const d = document.createElement(`div`);
    d.classList.add(`user-message`);
    const p = document.createElement(`p`);
    p.innerText = text;
    d.appendChild(p);
    document.getElementsByTagName(`body`)[0].appendChild(d);
    setTimeout(() => d.remove(), 5000);
}
// single qr common
async function generateAndDisplayQr(data?: string) {
    console.log(`gen and display qr`);
    const { qrdata, qrdisplay, qrdisplaycontainer, qrdldbtn } = getPointers();
    if (!data && !qrdata?.value) {
        userMessage(`No data for qr. Skipping generation.`)
        return;
    }
    qrdisplay.innerHTML = ``;
    const { svg, width, height } = await window.qrapi.qrcodesvg(data || qrdata.value);
    // console.log(`qrcodesvg returned ${width} & ${height}`);
    qrdisplaycontainer.setAttribute(`viewBox`, `0 0 ${width} ${height}`);
    qrdisplay.innerHTML = svg;
    // setDownloadButtonBlob();
    qrdldbtn.removeAttribute(`disabled`);
}
function setDownloadButtonBlob() {
    console.log(`set dl`);
    const { qrdisplaycontainer, qrlink } = getPointers();
    // <canvas id="myCanvas" width="300" height="300"></canvas>
    // get svg blob
    const { width, height } = qrdisplaycontainer.getBBox();
    const clonedSvg = qrdisplaycontainer.cloneNode(true) as SVGAElement;
    const svgBlob = new Blob([clonedSvg.outerHTML], { type: 'image/svg+xml' });
    console.log(`svg blob ok`);
    // svg blob to canvas blob url
    const DOMURL = window.URL || window.webkitURL; // || window;
    const svgBlobUrl = DOMURL.createObjectURL(svgBlob);
    console.log(`svg blob url ok`);
    // create & load image
    const img = new Image();
    return new Promise(r => {
        img.onload = function () {
            console.log(`image loaded`);
            // draw on canvas
            const canvas = document.createElement(`canvas`);
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            console.log(`canvas drawn`);
            // canvas data url as download link
            const pngDataUrl = canvas.toDataURL();
            qrlink.download = `qrcode.png`;
            qrlink.href = pngDataUrl;
            console.log(`link set`);
            DOMURL.revokeObjectURL(svgBlobUrl);
            r(1);
        };
        // init image
        img.src = svgBlobUrl;
    });
}
async function downloadQr() {
    console.log(`dowload clicked`);
    const { qrlink } = getPointers();
    await setDownloadButtonBlob();
    qrlink.click();
}
// vcard
interface IVcardForm {
    timezone?: string;
    bday?: string;
    email?: string;
    phonework?: string;
    phonemobile?: string;
    phonemobilepersonal?: string;
    websitework?: string;
    company?: string;
    surname: string;
    names: string;
    prefix?: string;
    suffix?: string;
    fullname: string;
    addressdetails?: string;
    addresslocalitycity?: string;
    addressregion?: string;
    addresszip?: string;
    addresscountry?: string;
    title?: string;
}
function getVcardFormData(): IVcardForm {
    console.log(`get vcard values`);
    const getVcInputValue = (vn: string) => getInputValue(`vc-${vn}`);
    const surname = getVcInputValue(`surname`);
    const names = getVcInputValue(`names`);
    const fullname = getVcInputValue(`fullname`);
    const addressdetails = getVcInputValue(`addressdetails`);
    if (!surname || !names || !fullname /* || !addressdetails */) {
        userMessage(`Form incomplete: Missing ${[
            !surname ? `surname` : ``,
            !names ? ` names` : ``,
            !fullname ? ` full name` : ``,
            !addressdetails ? `surname` : ``
        ].filter(a => a).join(`, `)
            } `);
        throw new TypeError(`Vcard Form Incomplete`);
    }
    return {
        timezone: getVcInputValue(`timezone`),
        bday: getVcInputValue(`bday`),
        email: getVcInputValue(`email`),
        phonework: getVcInputValue(`phonework`),
        phonemobile: getVcInputValue(`phonemobile`),
        phonemobilepersonal: getVcInputValue(`phonemobilepersonal`),
        websitework: getVcInputValue(`websitework`),
        company: getVcInputValue(`company`),
        surname,
        names,
        prefix: getVcInputValue(`prefix`),
        suffix: getVcInputValue(`suffix`),
        fullname,
        addressdetails,
        addresslocalitycity: getVcInputValue(`addresslocalitycity`),
        addressregion: getVcInputValue(`addressregion`),
        addresszip: getVcInputValue(`addresszip`),
        addresscountry: getVcInputValue(`addresscountry`),
        title: getVcInputValue(`title`)

    }
}
async function vcardGenHandler() {
    const vcard = await window.vcardapi.vcard(getVcardFormData());
    generateAndDisplayQr(vcard);
}
// vcards
interface IRowVcardForm extends IVcardForm {
    rowi: string;
}
function vcardsRmvDataRow(event: MouseEvent) {
    if (event.target instanceof HTMLButtonElement) {
        const rowi = event.target.dataset.row;
        const row = document.querySelector(`#contents #vc-${rowi}`);
        if (row) row.remove();
    }
}
function vcardsAddDataRow() {
    console.log(`add data row`);
    const { vcardsTable } = getPointers();
    if (!vcardsTable) return;
    const rowi = Array.from(vcardsTable.getElementsByTagName(`tr`)).length + 1;
    const fields = [
        `prefix`, `surname`, `names`, `suffix`, `fullname`, `title`, `bdate`, `email`, `phonework`, `phonemobile`, `phonemobilepersonal`
    ];

    const row = document.createElement(`tr`);
    row.setAttribute(`id`, `vc-${rowi}`)
    // select
    {
        const td = document.createElement(`td`);
        const i = document.createElement(`input`);
        i.setAttribute(`type`, `checkbox`);
        i.setAttribute(`id`, `vc-${rowi}-select`)
        i.setAttribute(`data-row`, `${rowi}`)
        i.classList.add(`data-row-selector`)
        td.appendChild(i);
        row.appendChild(td);
    }
    // fields
    for (const f of fields) {
        const td = document.createElement(`td`);
        const i = document.createElement(`input`);
        i.setAttribute(`type`, `text`);
        i.setAttribute(`id`, `vc-${rowi}-${f}`)
        i.setAttribute(`size`, `10`)
        td.appendChild(i);
        row.appendChild(td);
    }
    // actions & hidden svg
    {
        const td = document.createElement(`td`);
        const b = document.createElement(`button`);
        b.setAttribute(`class`, `delete-row-btn`);
        b.setAttribute(`data-row`, `${rowi}`);
        b.innerText = `X`;
        b.addEventListener(`click`, vcardsRmvDataRow)
        td.appendChild(b);
        const s = document.createElement(`svg`);
        s.setAttribute(`class`, `no-display`)
        s.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`)
        s.setAttribute(`id`, `qr-${rowi}`);
        s.setAttribute(`height`, `2000`);
        s.setAttribute(`width`, `2000`);
        const sdef = document.createElement(`def`);
        const sdefr = document.createElement(`rect`);
        sdefr.setAttribute(`id`, `dot`);
        sdefr.setAttribute(`height`, `10`);
        sdefr.setAttribute(`width`, `10`);
        sdefr.setAttribute(`fill`, `black`);
        sdef.appendChild(sdefr);
        s.appendChild(sdef);
        const sqr = document.createElement(`g`);
        sqr.setAttribute(`id`, `qrdisplay-${rowi}`);
        s.appendChild(sqr);
        td.appendChild(s);
        row.appendChild(td);
    }
    vcardsTable.appendChild(row);
}
function vcardsHandlerSelectDeselectAll() {
    const { vcardsSelectAll } = getPointers();
    Array.from(document.querySelectorAll(`#contents .data-row-selector`))
        .forEach((cb: HTMLInputElement) => cb.checked = vcardsSelectAll.checked);
}
const vcardsCompanyFormFields = [
    `company`,
    `addressdetails`,
    `addresslocalitycity`,
    `addressregion`,
    `addresszip`,
    `addresscountry`,
    `timezone`,
    `phonework`,
    `phonemobile`,
    `websitework`,
];
const vcardsEmployeeFormFields = [
    "bday",
    "email",
    "phonework",
    "phonemobile",
    "phonemobilepersonal",
    "surname",
    "names",
    "prefix",
    "suffix",
    "fullname",
    "title"
];
const vcardRequiredFields = [
    `surname`, `names`, `fullname`
];
function getVcardsFormData(): IRowVcardForm[] {
    console.log(`get vcards form data`);
    const data: IRowVcardForm[] = [];
    const companyData = vcardsCompanyFormFields.reduce((o: { [key: string]: string | undefined }, fn: string) => {
        o[fn] = getInputValue(`vc-${fn}`);
        return o;
    }, {});
    Array.from(document.querySelectorAll(`#contents .data-row-selector`))
        .forEach((cb: HTMLInputElement) => {
            const rowi = cb.dataset.row;
            const getVcInputValue = (vn: string) => getInputValue(`vc-${rowi}-${vn}`);
            const employeeData = vcardsEmployeeFormFields.reduce((o: { [key: string]: string | undefined }, fn: string) => {
                o[fn] = getVcInputValue(fn);
                return o;
            }, {})
            if (vcardRequiredFields.some(f => !employeeData[f])) {
                userMessage(`Employee ${rowi} form incomplete: Missing ${vcardRequiredFields
                    .filter(f => !employeeData[f])
                    .join(`, `)
                    } `);
                throw new TypeError(`Employee ${rowi} vcard form Incomplete`);
            }
            const rowData = {
                rowi,
                ...companyData,
                ...employeeData
            } as unknown as IRowVcardForm;
            data.push(rowData);
        });
    console.log(`got ${data.length} rows`)
    return data
}
async function generateAndStoreQr(rowi:string,data: string) {
    console.log(`gen and store qr`);
    const qrdisplaycontainer = document.querySelector(`#contents #qr-${rowi}`)
    const qrdisplay = document.querySelector(`#contents #qrdisplay-${rowi}`)
    const { vcardsDldBtn } = getPointers();

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
    const formObjects = getVcardsFormData();
    for (const o of formObjects) {
        const vcard = await window.vcardapi.vcard(o);
        generateAndStoreQr(o.rowi,vcard);
    }
}
// navigation common
function addPageEventListeners(pageName: string) {
    try {
        const { qrgenbtn, qrdldbtn, vcardqrgenbtn, vcardsGenBtn, vcardsAddRowBtn, vcardsSelectAll } = getPointers();
        if (pageName === `plaintext`) {
            qrgenbtn.addEventListener(`click`, () => generateAndDisplayQr());
            qrdldbtn.addEventListener(`click`, downloadQr);
        } else if (pageName === `vcard`) {
            vcardqrgenbtn.addEventListener(`click`, vcardGenHandler);
            qrdldbtn.addEventListener(`click`, downloadQr);
        }
        if (pageName === `vcards`) {
            vcardsAddRowBtn.addEventListener(`click`, vcardsAddDataRow);
            vcardsSelectAll.addEventListener(`change`, vcardsHandlerSelectDeselectAll);
            vcardsGenBtn.addEventListener(`click`, vcardsGenHandler);
        }
    } catch (err) {
        console.log(`Cannot add page listeners: ${err.message}`);
    }
}
function initPage(pageName: string) {
    if (pageName === `vcards`) {
        vcardsAddDataRow()
    }
}
// interface ImportHTMLLinkElement extends HTMLLinkElement {
//     import: HTMLElement;
// }
function changePage(pageName: string) {
    console.log(`changing page to ${pageName}`)
    // const links = document.querySelectorAll(`link[rel = "import"][data-page= "${pageName}"]`) as NodeListOf<ImportHTMLLinkElement>;
    // const link = links[0];
    // if (!link) return;
    // const template = link.import.querySelector('template');
    const template = document.getElementById(`template-${pageName}`) as HTMLTemplateElement;
    if (!template) {
        console.log(`template not found`);
        return;
    }
    const clone = document.importNode(template.content, true);

    pageContentDiv.innerHTML = ``;
    pageContentDiv.appendChild(clone);

    addPageEventListeners(pageName);
    initPage(pageName);
}
Array.prototype.forEach.call(document.getElementsByClassName(`nav-link`), (element: HTMLElement) => {
    element.addEventListener(`click`, function () {
        changePage(element.dataset.page);
    });
});
