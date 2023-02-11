import { IDocPointers as IPlaintextDocPointers } from "../plaintext/index.js";
import { IDocPointers as IVcardDocPointers } from "../vcard/index.js";
import { svgToPng } from "./image.js";

export function GenerateAndDisplayQr(
  /* window: Window, */
  pointers: IPlaintextDocPointers | IVcardDocPointers
) {
  return async function generateAndDisplayQr(event:Event,data?: string): Promise<void> {
    console.log(`gen and display qr`);
    const { qrdata, qrdisplay, qrdisplaycontainer, qrdldbtn } = pointers;
    if (!data && !qrdata?.value) {
      window.userMessage(`No data for qr. Skipping generation.`);
      return;
    }
    qrdisplay.innerHTML = ``;
    const { svg, width, height } = await window.qrapi.qrcodesvg(data || qrdata.value);
    // console.log(`qrcodesvg returned ${width} & ${height}`);
    qrdisplaycontainer.setAttribute(`viewBox`, `0 0 ${width} ${height}`);
    qrdisplay.innerHTML = svg;
    // setDownloadButtonBlob();
    qrdldbtn.removeAttribute(`disabled`);
  };
}

export function DownloadQr(pointers: IPlaintextDocPointers | IVcardDocPointers) {
  return async function downloadQr(): Promise<void> {
    console.log(`dowload clicked`);
    await setDownloadButtonBlob(pointers);
    pointers.qrlink.click();
  };
}

export async function setDownloadButtonBlob(pointers: IPlaintextDocPointers | IVcardDocPointers): Promise<void> {
  console.log(`set dl`);
  // get svg blob
  const png = await svgToPng(pointers.qrdisplaycontainer);
  pointers.qrlink.download = `qrcode.png`;
  pointers.qrlink.href = png;
  console.log(`link set`);
}
