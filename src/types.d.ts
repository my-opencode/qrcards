import { QRCodeOptions } from "qrcode";
import { IVcardForm } from "./formToVcard";

export { };
declare global {
    interface Window {
        qrapi: {
            qrcode(data: string, o?: QRCodeOptions): Promise<string>;
            qrcodesvg(data: string, o?: QRCodeOptions): Promise<{ svg: string, height: number; width: number }>;
        };
        vcardapi: {
            vcard(formObj: IVcardForm): Promise<string>;
        };
    }
}