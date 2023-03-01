
import { IApplicationDataStyle } from "../../../types";
import { disableBtn } from "./index.js";
export interface IDocColorPointers {
    textSaveBtn: HTMLElement,
    colorText: HTMLInputElement,
    textSize: HTMLInputElement,
    textFont: HTMLInputElement,
    textDisabled: HTMLInputElement,
}
export function getTextPointers(): IDocColorPointers {
    const textSaveBtn = document.querySelector(`#contents #qrstyletextsavebtn`) as HTMLElement;
    const colorText = document.querySelector(`#contents #qrstyletextcolor`) as HTMLInputElement;
    const textSize = document.querySelector(`#contents #qrstyletextsize`) as HTMLInputElement;
    const textFont = document.querySelector(`#contents #qrstyletextfont`) as HTMLInputElement;
    const textDisabled = document.querySelector(`#contents #qrstyletextdisabled`) as HTMLInputElement;

    return {
        textSaveBtn,
        colorText,
        textSize,
        textFont,
        textDisabled,
    };
}
export function saveTextBtnOnHandler(event: Event): void {
    const { textSaveBtn } = getTextPointers();
    disableBtn(textSaveBtn, false);
}
export function readTextForm(): IApplicationDataStyle {
    const {
        textFont,
        colorText,
        textSize,
        textDisabled,
    } = getTextPointers();
    const style: IApplicationDataStyle = {};
    style.colorText = colorText.value;
    style.textSize = parseInt(textSize.value);
    style.textFont = textFont.value === `serif` ? `serif` : `sans-serif`;
    style.textDisabled = !!textDisabled.checked;
    return style;
}
export async function resetTextForm(): Promise<void> {
    const {
        textFont,
        colorText,
        textSize,
        textDisabled,
    } = getTextPointers();
    const appData = await window.dataapi.getappdata();
    textFont.setAttribute(`value`, appData.style?.textFont || `sans-serif`);
    colorText.setAttribute(`value`, appData.style?.colorText || appData.style.colorDot || `#000000`);
    textSize.setAttribute(`value`, String(appData.style?.textSize || 30));
    if (appData.style?.textDisabled)
        textDisabled.setAttribute(`checked`, `checked`);
}
export async function saveTextHandler(event: Event): Promise<void> {
    const {
        textSaveBtn
    } = getTextPointers();

    const style = readTextForm();

    await window.dataapi.setappdata({ style });
    window.userMessage(`Text style saved`);
    disableBtn(textSaveBtn, true);
}