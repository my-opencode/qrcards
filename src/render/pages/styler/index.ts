import { getColorPointers, resetColorForm, saveColorsHandler, saveColorBtnOnHandler } from "./colors.js";
import { getLogoPointers, uploadDisplayLogoHandler, logoFormApplyData,removeLogoHandler } from "./logo.js";

export function init(/* window: Window, document: Document */): void {
  window.applyData = async function () {
    resetColorForm();
  };
  addPageEventListeners();
  resetColorForm();
  logoFormApplyData();
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
      logoRmvFile
    } = getLogoPointers();
    logoFile.addEventListener(`click`, uploadDisplayLogoHandler);
    logoRmvFile.addEventListener(`click`, removeLogoHandler);
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
