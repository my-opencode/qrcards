import { contextBridge, ipcRenderer } from "electron";
import { QRCodeOptions } from "qrcode";
import { IApplicationDataUpdate, IImgFileDesc, IVcardForm } from "./types";



contextBridge.exposeInMainWorld('qrapi', {
    qrcode: (data: string, o?: QRCodeOptions) => ipcRenderer.invoke('qrcode', data, o),
    qrcodesvg: (data: string, o?: QRCodeOptions) => ipcRenderer.invoke('qrcodesvg', data, o),
});
contextBridge.exposeInMainWorld('vcardapi', {
    vcard: (formObj: IVcardForm) => ipcRenderer.invoke('vcard', formObj),
});
contextBridge.exposeInMainWorld('zipapi', {
    zipimages: (images: IImgFileDesc[]) => ipcRenderer.invoke('zipimages', images),
});
contextBridge.exposeInMainWorld('dataapi', {
    loaddata: () => ipcRenderer.invoke('loaddata'),
    getappdata: () => ipcRenderer.invoke('getappdata'),
    setappdata: (data: IApplicationDataUpdate) => ipcRenderer.invoke('setappdata', data),
    saveappdata: () => ipcRenderer.invoke(`saveappdata`),
});

// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector:string, text:string) => {
//         const element = document.getElementById(selector)
//         if (element) element.innerText = text
//     }
//     for (const dependency of ['chrome', 'node', 'electron']) {
//         replaceText(`${dependency}-version`, process.versions[dependency])
//     }
// })