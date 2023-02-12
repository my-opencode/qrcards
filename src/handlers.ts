import { ipcMain } from 'electron';
import { qrobjToSvgHandler } from "./qr/qrobjToSvg";
import { vcardHandler } from './vcard/vcard';
import { appDataLoad, appDataGet, appDataSet, appDataSave, appDataStyleRemoveLogoHandler } from "./applicationData";
import { statePageUpdateHandler } from './state';
import { qrobjHandler } from './qr/qrobj';
import { zipImagesHandler } from './zip/zipImages';
import { uploadImageHandler } from './image/upload';
import { listAllSpritesHandler } from './sprites';

export function initHandlers(): void {
    ipcMain.handle(`pageUpdate`, statePageUpdateHandler );
    ipcMain.handle(`qrcode`, qrobjHandler);
    ipcMain.handle(`qrcodesvg`, qrobjToSvgHandler);
    ipcMain.handle(`vcard`, vcardHandler);
    ipcMain.handle(`zipimages`, zipImagesHandler);
    ipcMain.handle(`loaddata`, appDataLoad);
    ipcMain.handle(`getappdata`, appDataGet);
    ipcMain.handle(`setappdata`, appDataSet);
    ipcMain.handle(`saveappdata`, appDataSave);
    ipcMain.handle(`uploadimage`, uploadImageHandler);
    ipcMain.handle(`styleremovelogo`, appDataStyleRemoveLogoHandler);
    ipcMain.handle(`listsprites`, listAllSpritesHandler);
}