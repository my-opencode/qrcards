/* eslint-disable no-var */
import { QRCodeOptions } from "qrcode";

export type PageNames = "plaintext"|"vcard"|"vcards"|"styler";

export interface IImgFileDesc {
    filename: string;
    data: string
}
export interface IVcardCompanyForm {
    timezone?: string;
    phonework?: string;
    phonemobile?: string;
    websitework?: string;
    company?: string;
    addressdetails?: string;
    addresslocalitycity?: string;
    addressregion?: string;
    addresszip?: string;
    addresscountry?: string;
}
export interface IVcardEmployeeForm {
    bday?: string;
    email?: string;
    phonework?: string;
    phonemobile?: string;
    phonemobilepersonal?: string;
    surname: string;
    names: string;
    prefix?: string;
    suffix?: string;
    fullname: string;
    title?: string;
}
export type IVcardForm = IVcardCompanyForm & IVcardEmployeeForm;

export interface IApplicationData {
    style: { [key: string]: string };
    company: IVcardCompanyForm;
    employee_data: IVcardEmployeeForm[];
    company_form_fields: (keyof IVcardCompanyForm)[];
    employee_form_fields: (keyof IVcardEmployeeForm)[];
    vcard_required_fields: (keyof IVcardForm)[];
}

export interface IApplicationDataUpdate {
    style?: { [key: string]: string };
    company?: IVcardCompanyForm;
    employee_data?: IVcardEmployeeForm[];
    company_form_fields?: (keyof IVcardCompanyForm)[];
    employee_form_fields?: (keyof IVcardEmployeeForm)[];
    vcard_required_fields?: (keyof IVcardForm)[];
}

export interface IApplicationState {
    pageName: string
}
export interface IDocPointers {
    [key:string]:Element|HTMLElement|SVGAElement|HTMLInputElement|HTMLAnchorElement
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
            setappdata(data: IApplicationDataUpdate): Promise<void>;
            saveappdata(): Promise<void>;
            handleMenuAppDataLoaded(callback: () => void): void;
            handleMenuAppDataSave(callback: () => void): void;
        };
        pageapi: {
            pageChanged: (pageName: string) => void,
            handleGoTo(callback: (eventPhantom: Event, pageName: string) => void): void
        };
        applyData():Promise<void>;
        userMessage(txt:string):void;
    }
}
