import { DownloadQr, GenerateAndDisplayQr } from "../_shared/singleQr.js";
export interface IDocPointers {
  qrdata: HTMLInputElement,
  qrdisplaycontainer: SVGAElement,
  // qrdisplay: Element,
  qrdldbtn: Element,
  qrgenbtn: Element,
  qrlink: HTMLAnchorElement
}


export function init(/* window: Window, document: Document */): void {
  window.applyData = async function () {
    // placeholder
  };
  addPageEventListeners(/* window,document */);
}

export function getPointers(/* document: Document */): IDocPointers {
  const qrdata = document.querySelector(`#contents #qrdata`) as HTMLInputElement;
  const qrdisplaycontainer = document.querySelector(`#contents #qrdisplaycontainer`) as unknown as SVGAElement;
  // const qrdisplay = document.querySelector(`#contents #qrdisplay`) as HTMLInputElement;
  const qrdldbtn = document.querySelector('#contents #qrdldbtn') as HTMLInputElement;
  const qrgenbtn = document.querySelector('#contents #qrgenbtn') as HTMLInputElement;
  const qrlink = document.querySelector('#contents #qrdldlink') as HTMLAnchorElement;
  return {
    qrdata,
    qrdisplaycontainer,
    // qrdisplay,
    qrdldbtn,
    qrgenbtn,
    qrlink
  };
}

export function addPageEventListeners(/* window: Window,document:Document */): void {
  try {
    const pointers = getPointers(/* document */);
    const { qrgenbtn, qrdldbtn } = pointers;
    qrgenbtn.addEventListener(`click`, GenerateAndDisplayQr(/* window,  */pointers));
    qrdldbtn.addEventListener(`click`, DownloadQr(pointers));
  } catch (err) {
    console.log(`Cannot add page event listeners: ${err.message}`);
  }
}