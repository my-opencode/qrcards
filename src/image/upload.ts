import fs from "fs/promises";
import { dialog } from "electron";
import { imageSize } from "image-size";
import { IUploadedImage } from "../types";
import path from "path";

export async function uploadImage(): Promise<IUploadedImage> {
  let filePath = ``;
  try {
    const imagePath = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: `Images`, extensions: [`jpeg`, `jpg`, `png`] },
      ]
    });
    if (imagePath.canceled) {
      console.log(`Upload image: Cancelled by user.`);
      return;
    }
    filePath = imagePath.filePaths[0];
    const buffer = await fs.readFile(filePath);
    const { width, height } = imageSize(buffer);
    return { buffer, width, height, name: path.basename( imagePath.filePaths[0]) };
  } catch (err) {
    throw new Error(`Unable to upload image "${filePath}"\n${err instanceof Error ? err.message : err}`);
  }
}
export function uploadImageHandler(event: Event): Promise<IUploadedImage> {
  return uploadImage();
}