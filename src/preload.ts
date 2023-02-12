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
contextBridge.exposeInMainWorld('imageapi', {
    uploadimage: () => ipcRenderer.invoke('uploadimage'),
});
contextBridge.exposeInMainWorld('dataapi', {
    loaddata: () => ipcRenderer.invoke('loaddata'),
    getappdata: () => ipcRenderer.invoke('getappdata'),
    setappdata: (data: IApplicationDataUpdate) => ipcRenderer.invoke('setappdata', data),
    saveappdata: () => ipcRenderer.invoke(`saveappdata`),
    handleMenuAppDataLoaded: (callback: () => void) => ipcRenderer.on('appDataReloaded', callback),
    handleMenuAppDataSave: (callback: () => void) => ipcRenderer.on('appDataSave', callback),
    styleremovelogo: () => ipcRenderer.invoke(`styleremovelogo`),
});
contextBridge.exposeInMainWorld(`spriteapi`, {
    listsprites: () => ipcRenderer.invoke(`listsprites`)
});

contextBridge.exposeInMainWorld('pageapi', {
    pageChanged: (pageName: string) => ipcRenderer.invoke(`pageUpdate`, pageName),
    handleGoTo: (callback: (eventPhantom: Event, pageName: string) => void) => ipcRenderer.on('page-go-to', callback),
});
