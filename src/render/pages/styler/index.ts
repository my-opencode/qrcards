import { IApplicationDataStyle } from "../../../types";

export interface IDocColorPointers {
  colorSaveBtn: HTMLElement,
  colorDot: HTMLInputElement,
  colorBg: HTMLInputElement,
  colorEyeIrisOn: HTMLInputElement,
  colorEye: HTMLInputElement,
  colorIris: HTMLInputElement,
}
export interface IDocLogoPointers {
  logoSaveBtn: HTMLElement,
  logoFile: HTMLElement,
  logoPreview: HTMLElement,
  logoUrl: HTMLInputElement,
}
const MAX_LOGO_WIDTH = 400;
const MAX_LOGO_HEIGHT = 400;
export function init(/* window: Window, document: Document */): void {
  window.applyData = async function () {
    resetColorForm();
  };
  addPageEventListeners();
  resetColorForm();
}

export function getColorPointers(): IDocColorPointers {
  const colorSaveBtn = document.querySelector(`#contents #qrstylecolorsavebtn`) as HTMLElement;
  const colorDot = document.querySelector(`#contents #qrstyledotcolor`) as HTMLInputElement;
  const colorBg = document.querySelector(`#contents #qrstylebgcolor`) as HTMLInputElement;
  const colorEyeIrisOn = document.querySelector(`#contents #qrstylecheckeyecolor`) as HTMLInputElement;
  const colorEye = document.querySelector(`#contents #qrstyleeyecolor`) as HTMLInputElement;
  const colorIris = document.querySelector(`#contents #qrstyleiriscolor`) as HTMLInputElement;
  return {
    colorSaveBtn,
    colorDot,
    colorBg,
    colorEyeIrisOn,
    colorEye,
    colorIris,
  };
}

export function getLogoPointers(): IDocLogoPointers {
  const logoSaveBtn = document.querySelector(`#contents #qrstylelogosavebtn`) as HTMLElement;
  const logoFile = document.querySelector(`#contents #qrstylelogo`) as HTMLElement;
  const logoUrl = document.querySelector(`#contents #qrstylelogourl`) as HTMLInputElement;
  const logoPreview = document.querySelector(`#contents #qrstylelogopreview`) as HTMLElement;
  return {
    logoSaveBtn,
    logoFile,
    logoPreview,
    logoUrl
  };
}

export function addPageEventListeners(): void {
  try {
    const {
      colorDot,
      colorBg,
      colorEye,
      colorIris,
      colorSaveBtn,
    } = getColorPointers();
    colorDot.addEventListener(`change`, saveColorBtnOnHandler);
    colorBg.addEventListener(`change`, saveColorBtnOnHandler);
    colorEye.addEventListener(`change`, saveColorBtnOnHandler);
    colorIris.addEventListener(`change`, saveColorBtnOnHandler);
    colorSaveBtn.addEventListener(`click`, saveColorsHandler);
    const {
      logoFile,
    } = getLogoPointers();
    logoFile.addEventListener(`click`, uploadDisplayLogoHandler);
  } catch (err) {
    console.log(`Cannot add page listeners: ${err.message}`);
  }
}

export function disableBtn(btn: HTMLElement, disable: boolean): void {
  if (disable)
    btn.setAttribute(`disabled`, `disabled`);
  else
    btn.removeAttribute(`disabled`);
}

function saveColorBtnOnHandler(event: Event): void {
  const { colorSaveBtn } = getColorPointers();
  disableBtn(colorSaveBtn, false);
}

function readColorForm(): IApplicationDataStyle {
  const {
    colorDot,
    colorBg,
    colorEye,
    colorIris,
    colorEyeIrisOn
  } = getColorPointers();
  const style: IApplicationDataStyle = {};
  style.colorDot = colorDot.value;
  style.colorBg = colorBg.value;
  if (colorEyeIrisOn.checked) {
    style.colorEye = colorEye.value;
    style.colorIris = colorIris.value;
  }
  return style;
}

async function resetColorForm(): Promise<void> {
  const {
    colorDot,
    colorBg,
    colorEye,
    colorIris,
    colorEyeIrisOn
  } = getColorPointers();
  const appData = await window.dataapi.getappdata();
  colorDot.setAttribute(`value`, appData.style?.colorDot || `#000000`);
  colorBg.setAttribute(`value`, appData.style?.colorBg || `#FFFFFF`);

  if (appData.style?.colorEye || appData.style?.colorIris) {
    colorEyeIrisOn.setAttribute(`checked`, `checked`);
    colorEye.setAttribute(`value`, appData.style?.colorEye);
    colorIris.setAttribute(`value`, appData.style?.colorIris);
  }
}

async function saveColorsHandler(event: Event): Promise<void> {
  const {
    colorSaveBtn
  } = getColorPointers();

  const style = readColorForm();

  await window.dataapi.setappdata({ style });
  window.userMessage(`Colors saved`);
  disableBtn(colorSaveBtn, true);
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

async function uploadDisplayLogoHandler(event: Event): Promise<void> {
  const {
    logoPreview,
    logoUrl,
    logoSaveBtn
  } = getLogoPointers();
  try {
    const { buffer, width, height, name } = await window.imageapi.uploadimage();

    const canvas = document.createElement(`canvas`);
    logoPreview.innerHTML = ``;
    logoPreview.appendChild(canvas);
    const imgName = document.createElement(`h3`);
    const imgNameTxt = document.createTextNode(name);
    imgName.appendChild(imgNameTxt);
    logoPreview.appendChild(imgName);
    logoPreview.classList.remove(`placeholder`);
    disableBtn(logoSaveBtn, false);

    const blob = new Blob([buffer], { type: guessMimeType(name) });
    const DOMURL = window.URL || window.webkitURL; // || window;
    const blobUrl = DOMURL.createObjectURL(blob);

    const img = new Image();
    return new Promise(r => {
      img.onload = function () {
        console.log(`image loaded`);
        // draw on canvas
        resizeDraw(canvas, img, width, height);
        console.log(`canvas drawn`);
        logoUrl.value = canvas.toDataURL();
        DOMURL.revokeObjectURL(blobUrl);
        r();
      };
      // init image
      img.src = blobUrl;
    });
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