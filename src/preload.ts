import { contextBridge, ipcRenderer } from "electron";
import { QRCodeOptions } from "qrcode";

contextBridge.exposeInMainWorld('qrapi', {
    qrcode: (data: string, o?: QRCodeOptions) => ipcRenderer.invoke('qrcode', data, o),
    qrcodesvg: (data: string, o?: QRCodeOptions) => ipcRenderer.invoke('qrcodesvg', data, o),
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