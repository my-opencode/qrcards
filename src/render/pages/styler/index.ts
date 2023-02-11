import { IApplicationDataStyle } from "../../../types";

export interface IDocPointers {
  colorSaveBtn: HTMLElement,
  colorDot: HTMLInputElement,
  colorBg: HTMLInputElement,
  colorEyeIrisOn: HTMLInputElement,
  colorEye: HTMLInputElement,
  colorIris: HTMLInputElement,
}
export function init(/* window: Window, document: Document */): void {
  window.applyData = async function () {
    resetColorForm();
  };
  addPageEventListeners();
  resetColorForm();
}

export function getPointers(): IDocPointers {
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

export function addPageEventListeners(): void {
  try {
    const {
      colorDot,
      colorBg,
      colorEye,
      colorIris,
      colorSaveBtn
    } = getPointers();
    colorDot.addEventListener(`change`, saveBtnOnHandler);
    colorBg.addEventListener(`change`, saveBtnOnHandler);
    colorEye.addEventListener(`change`, saveBtnOnHandler);
    colorIris.addEventListener(`change`, saveBtnOnHandler);
    colorSaveBtn.addEventListener(`click`, saveColorsHandler);
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

function saveBtnOnHandler(event: Event): void {
  const { colorSaveBtn } = getPointers();
  disableBtn(colorSaveBtn, false);
}

function readColorForm(): IApplicationDataStyle {
  const {
    colorDot,
    colorBg,
    colorEye,
    colorIris,
    colorEyeIrisOn
  } = getPointers();
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
  } = getPointers();
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
  } = getPointers();

  const style = readColorForm();

  await window.dataapi.setappdata({ style });
  window.userMessage(`Colors saved`);
  disableBtn(colorSaveBtn, true);
}