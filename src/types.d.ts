import { QRCodeOptions } from "qrcode";

export { };
declare global {
    interface Window {
        qrapi: {
            qrcode(data: string, o?: QRCodeOptions): Promise<string>;
            qrcodesvg(data: string, o?: QRCodeOptions): Promise<{ svg: string, height: number; width: number }>;
        }
    }
}