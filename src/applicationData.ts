import fs from "fs/promises";
import { IApplicationData, IApplicationDataUpdate, IVcardCompanyForm, IVcardEmployeeForm, IVcardForm } from "./types";
import { dialog } from "electron";

const defaultCompanyFormFields:(keyof IVcardCompanyForm)[] = [
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
const defaultEmployeeormFields:(keyof IVcardEmployeeForm)[] = [
  "prefix",
  "surname",
  "names",
  "suffix",
  "fullname",
  "title",
  "bday",
  "email",
  "phonework",
  "phonemobile",
  "phonemobilepersonal",
  "cardDisplayName",
];
const defaultRequiredFields : (keyof IVcardForm)[] =[
  `surname`, `names`, `fullname`
];

export const applicationData: IApplicationData = {
  style: {},
  company: {
    company: ``,
    addressdetails: ``,
    addresslocalitycity: ``,
    addressregion: ``,
    addresszip: ``,
    addresscountry: ``,
    timezone: ``,
    phonework: ``,
    phonemobile: ``,
    websitework: ``,
  },
  employee_data: [{
    bday: ``,
    email: ``,
    phonework: ``,
    phonemobile: ``,
    phonemobilepersonal: ``,
    surname: ``,
    names: ``,
    prefix: ``,
    suffix: ``,
    fullname: ``,
    title: ``,
    cardDisplayName: ``,
  }],
  company_form_fields: defaultCompanyFormFields.slice(),
  employee_form_fields:defaultEmployeeormFields.slice(),
  vcard_required_fields: defaultRequiredFields.slice()
};

export async function appDataLoad(): Promise<void> {
  console.log(`load data from file`);
  const filePath = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: `Data JSON`, extensions: [`json`] },
      // { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
      // { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
      // { name: 'Custom File Type', extensions: ['as'] },
      // { name: 'All Files', extensions: ['*'] }
    ]
  });
  if (filePath.canceled) {
    console.log(`Load data: Cancelled by user.`);
    return;
  }
  const fileContents = await fs.readFile(filePath.filePaths[0], { encoding: `utf-8` });
  const data = JSON.parse(fileContents) as IApplicationData;
  if (data.style) applicationData.style = data.style;
  if (data.company) applicationData.company = data.company;
  if (data.employee_data) applicationData.employee_data = data.employee_data;
  // if (data.company_form_fields) applicationData.company_form_fields = data.company_form_fields;
  // if (data.employee_form_fields) applicationData.employee_form_fields = data.employee_form_fields;
  // if (data.vcard_required_fields) applicationData.vcard_required_fields = data.vcard_required_fields;
  console.log(`data loaded`);
}

export function appDataGet(): IApplicationData {
  return applicationData;
}

export function appDataSet(eventPhantom:Event, data: IApplicationDataUpdate): void {
  if (data.style) applicationData.style = { ...applicationData.style, ...data.style};
  if (data.company) applicationData.company = data.company;
  if (data.employee_data) applicationData.employee_data = data.employee_data;
  if (data.company_form_fields) applicationData.company_form_fields = data.company_form_fields;
  if (data.employee_form_fields) applicationData.employee_form_fields = data.employee_form_fields;
  if (data.vcard_required_fields) applicationData.vcard_required_fields = data.vcard_required_fields;
}

export async function appDataSave():Promise<void> {
  console.log(`load data from file`);
  const filePath = await dialog.showSaveDialog({
    filters: [
      { name: `Data JSON`, extensions: [`json`] },
    ]
  });
  if (filePath.canceled) {
    console.log(`Save data: Cancelled by user.`);
    return;
  }
  await fs.writeFile(filePath.filePath, JSON.stringify(applicationData, null, ` `), { encoding: `utf-8` });
}

export function appDataStyleRemoveLogoHandler(event:Event):void{
  delete applicationData.style.logo;
  delete applicationData.style.logoHeight;
  delete applicationData.style.logoWidth;
}