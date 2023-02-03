import { QRCodeOptions } from "qrcode";
import { IVcardForm } from "./formToVcard";

export interface IImgFileDesc {
    filename: string;
    data: string
}
export interface IVcardForm {
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

declare global {
    interface Window {
        qrapi: {
            qrcode(data: string, o?: QRCodeOptions): Promise<string>;
            qrcodesvg(data: string, o?: QRCodeOptions): Promise<{ svg: string, height: number; width: number }>;
        };
        vcardapi: {
            vcard(formObj: IVcardForm): Promise<string>;
        };
        zipapi: {
            zipimages(images: IImgFileDesc[]): Promise<Buffer>;
        };
    }
}
