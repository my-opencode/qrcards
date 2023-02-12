
import { IApplicationDataStyle } from "../../../types";
import { disableBtn } from "./index.js";
export interface IDocColorPointers {
  colorSaveBtn: HTMLElement,
  colorDot: HTMLInputElement,
  colorBg: HTMLInputElement,
  colorEyeIrisOn: HTMLInputElement,
  colorEye: HTMLInputElement,
  colorIris: HTMLInputElement,
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
export function saveColorBtnOnHandler(event: Event): void {
  const { colorSaveBtn } = getColorPointers();
  disableBtn(colorSaveBtn, false);
}
export function readColorForm(): IApplicationDataStyle {
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
export async function resetColorForm(): Promise<void> {
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
export async function saveColorsHandler(event: Event): Promise<void> {
  const {
    colorSaveBtn
  } = getColorPointers();

  const style = readColorForm();

  await window.dataapi.setappdata({ style });
  window.userMessage(`Colors saved`);
  disableBtn(colorSaveBtn, true);
}