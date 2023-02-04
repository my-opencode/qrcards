import { IApplicationData } from "./types";

export const applicationData : IApplicationData = {
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
  }],
  company_form_fields: [
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
  ],
  employee_form_fields: [
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
    "phonemobilepersonal"
  ],
  vcard_required_fields: [
    `surname`, `names`, `fullname`
  ]
};
