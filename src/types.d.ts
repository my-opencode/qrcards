/* eslint-disable no-var */
import { QRCodeOptions } from "qrcode";

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
export interface IApplicationData{
    style: {[key:string]:string};
    company: {[key:string]:string};
    employee_data: {[key:string]:string}[];
    company_form_fields: string[];
    employee_form_fields: string[];
    vcard_required_fields: string[];
}
export interface IApplicationDataUpdate{
    style?: {[key:string]:string};
    company?: {[key:string]:string};
    employee_data?: {[key:string]:string}[];
    company_form_fields?: string[];
    employee_form_fields?: string[];
    vcard_required_fields?: string[];
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
        dataapi: {
            loaddata(): Promise<void>;
            getappdata(): Promise<IApplicationData>;
            setappdata(data:IApplicationDataUpdate): Promise<void>;
            saveappdata(): Promise<void>;
        };
    }
}
