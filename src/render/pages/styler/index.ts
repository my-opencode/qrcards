export interface IDocPointers {
  qrdata: HTMLInputElement,
  qrdisplaycontainer: SVGAElement,
  qrdisplay: Element,
  qrdldbtn: Element,
  qrgenbtn: Element,
  qrlink: HTMLAnchorElement,
  vcardqrgenbtn: Element,
  vcardsAddRowBtn: Element,
  vcardsDldBtn: Element,
  vcardsGenBtn: Element,
  vcardsSelectAll: HTMLInputElement,
  vcardsTable: Element,
  vcardsdataloadbtn: Element,
  vcardsdatadownloadbtn: Element,
  ziplink: HTMLAnchorElement
}
export function init(/* window: Window, document: Document */): void {
  window.applyData = async function () {
    // placeholder
  };
  addPageEventListeners();
}

export function getPointers(document: Document): IDocPointers {
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
  const vcardsdataloadbtn = document.querySelector(`#contents #vcardsdataloadbtn`);
  const vcardsdatadownloadbtn = document.querySelector(`#contents #vcardsdatadownloadbtn`);
  const ziplink = document.querySelector('#contents #zipdldlink') as HTMLAnchorElement;
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
    vcardsTable,
    vcardsdataloadbtn,
    vcardsdatadownloadbtn,
    ziplink
  };
}
export function addPageEventListeners(): void {
  try {
    // const { } = getPointers(document);
    // qrdldbtn.addEventListener(`click`, downloadQr);

  } catch (err) {
    console.log(`Cannot add page listeners: ${err.message}`);
  }
}