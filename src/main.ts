import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import * as QRCode from "qrcode";
import {qrobjToSvg} from "./qrobjToSvg";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 550,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    ipcMain.handle(`qrcode`, function (event, data:string, o?:QRCode.QRCodeOptions) {
        console.log(`create qr code for`, data);
        const qrobj = QRCode.create(data, o);
        return qrobj;
    });
    ipcMain.handle(`qrcodesvg`, function (event, data, o:QRCode.QRCodeOptions) {
        console.log(`create qr code for`, data);
        const qrobj = QRCode.create(data, o);
        const { svg, height, width } = qrobjToSvg(qrobj);
        return {
            svg,
            height,
            width
        };
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