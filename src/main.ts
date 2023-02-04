import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import fs from 'fs/promises';
import * as QRCode from "qrcode";
import { qrobjToSvg } from "./qrobjToSvg";
import { IApplicationData, IApplicationDataUpdate, IImgFileDesc, IVcardForm } from "./types";
import { formToVcard } from './formToVcard';
import { zipImages, zipToBlob } from "./zipImages";
import { applicationData } from "./applicationData";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 550,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
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
    ipcMain.handle(`loaddata`, async function () {
        console.log(`load data from file`);
        const filePath = await dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { name: `Data JSON`, extensions: [`json`] },
                // { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
                // { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
                // { name: 'Custom File Type', extensions: ['as'] },
                // { name: 'All Files', extensions: ['*'] }
            ]
        });
        if (filePath.canceled) {
            console.log(`Load data: Cancelled by user.`);
            return;
        }
        const fileContents = await fs.readFile(filePath.filePaths[0], { encoding: `utf-8` });
        const data = JSON.parse(fileContents) as IApplicationData;
        if (data.style) applicationData.style = data.style;
        if (data.company) applicationData.company = data.company;
        if (data.employee_data) applicationData.employee_data = data.employee_data;
        if (data.company_form_fields) applicationData.company_form_fields = data.company_form_fields;
        if (data.employee_form_fields) applicationData.employee_form_fields = data.employee_form_fields;
        if (data.vcard_required_fields) applicationData.vcard_required_fields = data.vcard_required_fields;
        console.log(`data loaded`);
    });
    ipcMain.handle(`getappdata`, function () {
        return applicationData;
    });
    ipcMain.handle(`setappdata`, function (event, data: IApplicationDataUpdate) {
        if (data.style) applicationData.style = data.style;
        if (data.company) applicationData.company = data.company;
        if (data.employee_data) applicationData.employee_data = data.employee_data;
        if (data.company_form_fields) applicationData.company_form_fields = data.company_form_fields;
        if (data.employee_form_fields) applicationData.employee_form_fields = data.employee_form_fields;
        if (data.vcard_required_fields) applicationData.vcard_required_fields = data.vcard_required_fields;
    });
    win.loadFile(path.resolve(__dirname, '../html/index.html'))
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})