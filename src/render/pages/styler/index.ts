import { getColorPointers, resetColorForm, saveColorsHandler, saveColorBtnOnHandler } from "./colors.js";
import { getLogoPointers, uploadDisplayLogoHandler, logoFormApplyData, removeLogoHandler, saveLogoHandler } from "./logo.js";
import { getSpritesPointers, buildForm, spritesFormApplyData, saveSpritesHandler } from "./sprites.js";
import { getTextPointers, resetTextForm, saveTextBtnOnHandler, saveTextHandler } from "./text.js";

export function init(/* window: Window, document: Document */): void {
  window.applyData = async function () {
    resetColorForm();
    resetTextForm();
    logoFormApplyData();
    spritesFormApplyData();
  };
  resetColorForm();
  resetTextForm();
  logoFormApplyData();
  buildForm();
  spritesFormApplyData();
  addPageEventListeners();
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
      colorText,
      textDisabled,
      textFont,
      textSize,
      textSaveBtn,
    } = getTextPointers();
    colorText.addEventListener(`change`, saveTextBtnOnHandler);
    textDisabled.addEventListener(`change`, saveTextBtnOnHandler);
    textFont.addEventListener(`change`, saveTextBtnOnHandler);
    textSize.addEventListener(`input`, saveTextBtnOnHandler);
    textSaveBtn.addEventListener(`click`, saveTextHandler);
    const {
      logoSaveBtn,
      logoFile,
      logoRmvFile
    } = getLogoPointers();
    logoFile.addEventListener(`click`, uploadDisplayLogoHandler);
    logoRmvFile.addEventListener(`click`, removeLogoHandler);
    logoSaveBtn.addEventListener(`click`, saveLogoHandler);
    const { spritesSaveBtn } = getSpritesPointers();
    spritesSaveBtn.addEventListener(`click`, saveSpritesHandler);
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
