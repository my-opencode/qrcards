import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { initHandlers } from './handlers';
import { initMenu } from './menu';
let mainWindow:BrowserWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 550,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadFile(path.resolve(__dirname, '../html/index.html'));
    // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();
    initHandlers();
    initMenu(mainWindow);
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});