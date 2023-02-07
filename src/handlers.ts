import { ipcMain } from 'electron';
import * as QRCode from "qrcode";
import { qrobjToSvg } from "./qrobjToSvg";
import { IImgFileDesc, IVcardForm } from "./types";
import { formToVcard } from './formToVcard';
import { zipImages, zipToBlob } from "./zipImages";
import { appDataLoad, appDataGet, appDataSet, appDataSave } from "./applicationData";
import { applicationState } from './state';

export function initHandlers(): void {
    ipcMain.handle(`pageUpdate`, function (event, pageName: string) {
        applicationState.pageName = pageName;
    });
    ipcMain.handle(`qrcode`, function (event, data: string, o?: QRCode.QRCodeOptions) {
        console.log(`create qr code for`, data);
        const qrobj = QRCode.create(data, o);
        return qrobj;
    });
    ipcMain.handle(`qrcodesvg`, function (event, data, o: QRCode.QRCodeOptions) {
        console.log(`create qr code for`, data);
        const qrobj = QRCode.create(data, o);
        const { svg, height, width } = qrobjToSvg(qrobj);
        return {
            svg,
            height,
            width
        };
    });
    ipcMain.handle(`vcard`, function (event, formObj: IVcardForm) {
        console.log(`build vcard`);
        const vcard = formToVcard(formObj);
        return vcard;
    });
    ipcMain.handle(`zipimages`, async function (event, images: IImgFileDesc[]) {
        console.log(`zip images`);
        const zip = await zipToBlob(zipImages(images));
        return zip;
    });
    ipcMain.handle(`loaddata`, appDataLoad);
    ipcMain.handle(`getappdata`, appDataGet);
    ipcMain.handle(`setappdata`, appDataSet);
    ipcMain.handle(`saveappdata`, appDataSave);
}