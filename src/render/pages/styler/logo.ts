import { IApplicationDataStyle } from "../../../types";
import { disableBtn } from "./index.js";
export interface IDocLogoPointers {
  logoSaveBtn: HTMLElement,
  logoFile: HTMLElement,
  logoPreview: HTMLElement,
  logoUrl: HTMLInputElement,
  logoRmvFile: HTMLElement,
}
const MAX_LOGO_WIDTH = 400;
const MAX_LOGO_HEIGHT = 400;
export function getLogoPointers(): IDocLogoPointers {
  const logoSaveBtn = document.querySelector(`#contents #qrstylelogosavebtn`) as HTMLElement;
  const logoFile = document.querySelector(`#contents #qrstylelogo`) as HTMLElement;
  const logoRmvFile = document.querySelector(`#contents #qrstylelogoremove`) as HTMLElement;
  const logoUrl = document.querySelector(`#contents #qrstylelogourl`) as HTMLInputElement;
  const logoPreview = document.querySelector(`#contents #qrstylelogopreview`) as HTMLElement;
  return {
    logoSaveBtn,
    logoFile,
    logoPreview,
    logoUrl,
    logoRmvFile
  };
}
function extname(fn: string) {
  const i = fn.lastIndexOf(`.`);
  if (i < 0) return fn;
  return fn.slice(i + 1);
}
function guessMimeType(fn: string) {
  const ext = extname(fn);
  if (ext === `jpg` || ext === `jpg`)
    return `image/jpg`;
  else if (ext === `png`)
    return `image/png`;
  else return `image`;
}

function displayLogoFileName(name: string) {
  const { logoPreview } = getLogoPointers();
  const imgName = document.createElement(`h3`);
  const imgNameTxt = document.createTextNode(name);
  imgName.appendChild(imgNameTxt);
  logoPreview.appendChild(imgName);
}

async function displayLogo(dataUrl?: string, width?: number, height?: number, name?: string): Promise<void> {
  const {
    logoPreview,
    logoUrl
  } = getLogoPointers();
  const appData = await window.dataapi.getappdata();
  if (!dataUrl) dataUrl = appData.style.logo;
  if (!dataUrl) return;

  if (!width) width = appData.style.logoWidth;
  if (!height) height = appData.style.logoHeight;

  const canvas = document.createElement(`canvas`);
  logoPreview.innerHTML = ``;
  logoPreview.appendChild(canvas);
  if (name) displayLogoFileName(name);
  logoPreview.classList.remove(`placeholder`);

  const img = new Image();
  return new Promise(r => {
    img.onload = function () {
      console.log(`image loaded`);
      // draw on canvas
      resizeDraw(canvas, img, width, height);
      console.log(`canvas drawn`);
      logoUrl.value = canvas.toDataURL();
      r();
    };
    // init image
    img.src = dataUrl;
  });
}

export async function uploadDisplayLogoHandler(event: Event): Promise<void> {
  const {
    logoSaveBtn
  } = getLogoPointers();
  try {
    const { buffer, width, height, name } = await window.imageapi.uploadimage();

    const blob = new Blob([buffer], { type: guessMimeType(name) });
    const DOMURL = window.URL || window.webkitURL; // || window;
    const blobUrl = DOMURL.createObjectURL(blob);

    await displayLogo(blobUrl, width, height, name);

    DOMURL.revokeObjectURL(blobUrl);
    disableBtn(logoSaveBtn, false);
  } catch (err) {
    if (err instanceof TypeError && err.message.slice(0, 27) === `Cannot destructure property`) {
      // user cancelled
      // do nothing
    } else {
      console.error(err);
      window.userMessage(`Unable to open logo`);
    }
  }
}

function resizeDrawHeight(canvas: HTMLCanvasElement, img: HTMLImageElement, width: number, height: number) {
  const _width = MAX_LOGO_HEIGHT * (width / height);
  canvas.width = _width;
  canvas.height = MAX_LOGO_HEIGHT;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, _width, MAX_LOGO_HEIGHT);
}
function resizeDrawWidth(canvas: HTMLCanvasElement, img: HTMLImageElement, width: number, height: number) {
  const _height = MAX_LOGO_WIDTH * (height / width);
  canvas.width = MAX_LOGO_WIDTH;
  canvas.height = _height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, MAX_LOGO_WIDTH, _height);
}
function resizeDraw(canvas: HTMLCanvasElement, img: HTMLImageElement, width: number, height: number) {

  if (width <= MAX_LOGO_WIDTH && height <= MAX_LOGO_HEIGHT) {
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
  } else if (width > MAX_LOGO_WIDTH && height > MAX_LOGO_HEIGHT)
    if (width > height)
      resizeDrawWidth(canvas, img, width, height);
    else
      resizeDrawHeight(canvas, img, width, height);
}
export async function logoFormApplyData(): Promise<void> {
  const appData = await window.dataapi.getappdata();
  if (!appData.style.logo) return;
  const { logo, logoHeight, logoWidth } = appData.style;
  await displayLogo(logo, logoWidth, logoHeight);
}
export function removeLogo(): void {
  const { logoPreview,
    logoSaveBtn,
    logoUrl
  } = getLogoPointers();
  logoPreview.innerHTML = ``;
  logoPreview.classList.add(`placeholder`);
  disableBtn(logoSaveBtn, false);
  logoUrl.value = ``;
}
export function removeLogoHandler(event: Event): void {
  removeLogo();
}

export function readLogoForm(): IApplicationDataStyle {
  const {
    logoUrl,
    logoPreview
  } = getLogoPointers();
  const style: IApplicationDataStyle = {};
  style.logo = logoUrl.value || ``;
  if (style.logo) {
    const canvas = logoPreview.querySelector(`canvas`);
    style.logoWidth = canvas.width;
    style.logoHeight = canvas.height;
  }
  return style;
}

export async function saveLogoHandler(event: Event): Promise<void> {
  const {
    logoSaveBtn
  } = getLogoPointers();

  const style = readLogoForm();

  if(style.logo)
    await window.dataapi.setappdata({ style });
  else 
    await window.dataapi.styleremovelogo();
  window.userMessage(`Logo saved`);
  disableBtn(logoSaveBtn, true);
}