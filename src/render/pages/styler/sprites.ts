import { IApplicationDataStyle, ISpriteListItem } from "../../../types";
import { disableBtn } from "./index.js";
export interface IDocSpritePointers {
  spritesSaveBtn: HTMLElement,
  spritesDotsWrapper: HTMLElement,
  spritesEyesWrapper: HTMLElement,
  spritesIrisesWrapper: HTMLElement,
  spritesDots: HTMLInputElement,
  spritesEyes: HTMLInputElement,
  spritesIrises: HTMLInputElement,
}
export function getSpritesPointers(): IDocSpritePointers {
  const spritesSaveBtn = document.querySelector(`#contents #qrstylelogosavebtn`) as HTMLElement;
  const spritesDotsWrapper = document.querySelector(`#contents #qrstyledotstyleselect`) as HTMLElement;
  const spritesEyesWrapper = document.querySelector(`#contents #qrstyleeyestyleselect`) as HTMLElement;
  const spritesIrisesWrapper = document.querySelector(`#contents #qrstyleirisstyleselect`) as HTMLElement;
  const spritesDots = document.querySelector(`#contents [name="dotstyle"]`) as HTMLInputElement;
  const spritesEyes = document.querySelector(`#contents [name="eyestyle"]`) as HTMLInputElement;
  const spritesIrises = document.querySelector(`#contents [name="irisstyle"]`) as HTMLInputElement;
  return {
    spritesSaveBtn,
    spritesDotsWrapper,
    spritesEyesWrapper,
    spritesIrisesWrapper,
    spritesDots,
    spritesEyes,
    spritesIrises,
  };
}

function buildOneForm(container: HTMLElement, name: string, spritesArr: ISpriteListItem[]/* ,value?:string */) {
  container.innerHTML = ``;
  for (const { id, displayName } of spritesArr) {
    const label = document.createElement(`label`);
    const input = document.createElement(`input`);
    input.setAttribute(`type`, `radio`);
    input.setAttribute(`name`, name);
    input.setAttribute(`value`, id);
    input.setAttribute(`class`, `no-display`);
    // if (value && value === id)
    //   input.setAttribute(`checked`,`checked`);
    label.appendChild(input);
    const selector = document.createElement(`div`);
    selector.setAttribute(`class`,`radio-selector`);
    const preview = document.createElement(`div`);
    preview.setAttribute(`class`,`sprite-preview`);
    selector.appendChild(preview);
    const txtSpan = document.createElement(`span`);
    txtSpan.setAttribute(`class`,`txt-center`);
    const txt = document.createTextNode(displayName);
    txtSpan.appendChild(txt);
    selector.appendChild(txtSpan);
    label.appendChild(selector);
    container.appendChild(label);
  }
  // if(!value)
  container.children[0].setAttribute(`checked`, `checked`);
}

export async function buildForm(): Promise<void> {
  const spritesLists = await window.spriteapi.listsprites();
  const { spritesDotsWrapper, spritesEyesWrapper, spritesIrisesWrapper } = getSpritesPointers();
  buildOneForm(spritesDotsWrapper, `dotstyle`, spritesLists.dots);
  buildOneForm(spritesEyesWrapper, `eyestyle`, spritesLists.eyes);
  buildOneForm(spritesIrisesWrapper, `irisstyle`, spritesLists.irises);
}

function setStyleValue(name: string, value: string) {
  document.querySelectorAll(`#contents input[name="${name}"]`)
    .forEach(e => e.removeAttribute(`checked`));
  document.querySelector(`#contents input[name="${name}"][value="${value}"]`)
    ?.setAttribute?.(`checked`, `checked`);
}

export async function spritesFormApplyData(): Promise<void> {
  const appData = await window.dataapi.getappdata();
  if (appData.style.spritesDots)
    setStyleValue(`dotstyle`, appData.style.spritesDots);
  if (appData.style.spritesEyes)
    setStyleValue(`eyestyle`, appData.style.spritesEyes);
  if (appData.style.spritesIrises)
    setStyleValue(`irisstyle`, appData.style.spritesIrises);
}

export function saveSpritesBtnOnHandler(): void {
  const { spritesSaveBtn } = getSpritesPointers();
  disableBtn(spritesSaveBtn, false);
}