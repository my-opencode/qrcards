import { Menu, MenuItem, BrowserWindow } from "electron";
import { appDataLoad, appDataSave } from "./applicationData";
import { applicationState } from "./state";
const isMac = process.platform === 'darwin';

export function initMenu(win: BrowserWindow): void {
  const menu = Menu.buildFromTemplate(buildMenuTemplate(win));
  Menu.setApplicationMenu(menu);
}

function buildMenuTemplate(win: BrowserWindow) {
  const template: MenuItem[] = [];
  // { role: 'appMenu' }
  if (isMac)
    template.push(new MenuItem({
      label: `QrCards`,
      submenu: Menu.buildFromTemplate([
        new MenuItem({
          role: `about`
        }),
        new MenuItem({
          type: `separator`
        }),
        new MenuItem({
          role: `hide`
        }),
        new MenuItem({
          role: `hideOthers`
        }),
        new MenuItem({
          role: `unhide`
        }),
        new MenuItem({
          type: `separator`
        }),
        new MenuItem({
          role: `quit`
        })
      ])
    }));
  // { role: 'fileMenu' }
  template.push(new MenuItem({
    label: `File`,
    submenu: Menu.buildFromTemplate([
      new MenuItem({
        label: `Load`,
        click: async () => {
          await appDataLoad();
          win.webContents.send('appDataReloaded');
        },
        accelerator: `O`
      }),
      new MenuItem({
        label: `Save`,
        click: () => {
          if (applicationState.pageName === `vcards`)
            win.webContents.send('appDataSave');
          else appDataSave();
        },
        accelerator: `S`
      }),
      new MenuItem({
        type: `separator`
      }),
      new MenuItem({
        role: isMac ? `close` : `quit`,
        accelerator: `Q`
      }),
    ])
  }));
  // { role: 'editMenu' }
  template.push(new MenuItem({
    label: `Edit`,
    submenu: Menu.buildFromTemplate([
      new MenuItem({
        label: `Style`,
        click: () => { win.webContents.send('page-go-to', `styler`); },
        accelerator: `Y`
      })
    ])
  }));
  // { role: 'windowMenu' }
  template.push(new MenuItem({
    label: `Window`,
    submenu: Menu.buildFromTemplate([
      new MenuItem({
        label: `Simple QR`,
        click: () => { win.webContents.send('page-go-to', `plaintext`); },
        accelerator:`1`
      }),
      new MenuItem({
        label: `Single Vcard Qr`,
        click: () => { win.webContents.send('page-go-to', `vcard`); },
        accelerator: `2`
      }),
      new MenuItem({
        label: `Batch Vcard Qrs`,
        click: () => { win.webContents.send('page-go-to', `vcards`); },
        accelerator: `3`
      }),
      new MenuItem({
        type: `separator`
      }),
      new MenuItem({
        role: 'minimize'
      }),
      new MenuItem({
        role: 'togglefullscreen'
      }),
      new MenuItem({
        role: 'reload'
      })
    ])
  }));
  // { role: 'help' }
  template.push(new MenuItem({
    label: `help`,
    submenu: Menu.buildFromTemplate([
      new MenuItem({
        role: 'about'
      })
    ])
  }));
  return template;
}
