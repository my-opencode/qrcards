import JSZip from "jszip";
import path = require("path");
import { IImgFileDesc } from "../types";

export function zipImages(images: IImgFileDesc[]): JSZip {
  const zip = new JSZip();
  zip.file(`QrVcard list.txt`, `Exported on ${new Date()}
Number of cards: ${images.length}
${images.map(
    desc => `  - ` + path.join(`images`,desc.filename)
  ).join(`\n`)}`);
  const imgDir = zip.folder(`images`);
  for (const imgDesc of images) {
    imgDir.file(imgDesc.filename, imgDesc.data, { base64: true });
  }
  return zip;
}

export async function zipToBlob(zip: JSZip): Promise<Buffer> {
  return await zip.generateAsync({ type: `nodebuffer` });
}

export async function zipImagesHandler(event: Event, images: IImgFileDesc[]): Promise<Buffer> {
  console.log(`zip images`);
  const zip = await zipToBlob(zipImages(images));
  return zip;
}