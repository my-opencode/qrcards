import JSZip from "jszip";
export interface IImgFileDesc {
    filename: string;
    data: string
}
export function zipImages(images: IImgFileDesc[]): JSZip {
    const zip = new JSZip();
    zip.file(`textfile.txt`, `hello`);
    const imgDir = zip.folder(`images`);
    for (const imgDesc of images) {
        imgDir.file(imgDesc.filename, imgDesc.data, { base64: true });
    }
    return zip;
}

export async function zipToBlob(zip:JSZip):Promise<Blob> {
    return await zip.generateAsync({type:`blob`});
}