import { DownloadQr, GenerateAndDisplayQr } from "../_shared/singleQr.js";
import { getInputValue } from "../_shared/inputs.js";
interface baseObj { [key: string]: string|undefined }
interface IVcardForm extends baseObj {
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
export interface IDocPointers {
  qrdata: HTMLInputElement,
  qrdisplaycontainer: SVGAElement,
  // qrdisplay: Element,
  qrdldbtn:  HTMLInputElement,
  qrgenbtn:  HTMLInputElement,
  qrlink: HTMLAnchorElement,
  vcardqrgenbtn: HTMLInputElement,
  ziplink: HTMLAnchorElement
}

export function init(/* window: Window, document: Document */): void {
  window.applyData = async function () {
    // placeholder
  };
  addPageEventListeners();
}

export function getPointers(/* document: Document */): IDocPointers {
  const qrdisplaycontainer = document.querySelector(`#contents #qrdisplaycontainer`) as unknown as SVGAElement;
  const qrgenbtn = document.querySelector('#contents #qrgenbtn') as HTMLInputElement;
  const vcardqrgenbtn = document.querySelector('#contents #vcardqrgenbtn') as HTMLInputElement;
  const qrdldbtn = document.querySelector('#contents #qrdldbtn') as HTMLInputElement;
  const qrlink = document.querySelector('#contents #qrdldlink') as HTMLAnchorElement;
  // const qrdisplay = document.querySelector(`#contents #qrdisplay`);
  const qrdata = document.querySelector(`#contents #qrdata`) as HTMLInputElement;
  const ziplink = document.querySelector('#contents #zipdldlink') as HTMLAnchorElement;
  return {
    qrdata,
    qrdisplaycontainer,
    // qrdisplay,
    qrdldbtn,
    qrgenbtn,
    qrlink,
    vcardqrgenbtn,
    ziplink
  };
}

export function addPageEventListeners(): void {
  try {
    const pointers = getPointers(/* document */);
    const { qrdldbtn, vcardqrgenbtn } = pointers;
    vcardqrgenbtn.addEventListener(`click`, vcardGenHandler);
    qrdldbtn.addEventListener(`click`, DownloadQr(pointers));
  } catch (err) {
    console.log(`Cannot add page listeners: ${err.message}`);
  }
}

function getVcardFormData(): IVcardForm {
  console.log(`get vcard values`);
  const getVcInputValue = (vn: string) => getInputValue(`vc-${vn}`);
  const surname = getVcInputValue(`surname`);
  const names = getVcInputValue(`names`);
  const fullname = getVcInputValue(`fullname`);
  const addressdetails = getVcInputValue(`addressdetails`);
  if (!surname || !names || !fullname /* || !addressdetails */) {
    window.userMessage(`Form incomplete: Missing ${[
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
  };
}

async function vcardGenHandler() {
  const vcard = await window.vcardapi.vcard(getVcardFormData());
  GenerateAndDisplayQr(getPointers())(undefined, vcard);
}