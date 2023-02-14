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
  spritesRadiosDots: NodeListOf<HTMLInputElement>,
  spritesRadiosEyes: NodeListOf<HTMLInputElement>,
  spritesRadiosIrises: NodeListOf<HTMLInputElement>

}
export function getSpritesPointers(): IDocSpritePointers {
  const spritesSaveBtn = document.querySelector(`#contents #qrstyledesignsavebtn`) as HTMLElement;
  const spritesDotsWrapper = document.querySelector(`#contents #qrstyledotstyleselect`) as HTMLElement;
  const spritesEyesWrapper = document.querySelector(`#contents #qrstyleeyestyleselect`) as HTMLElement;
  const spritesIrisesWrapper = document.querySelector(`#contents #qrstyleirisstyleselect`) as HTMLElement;
  const spritesRadiosDots = document.querySelectorAll(`#contents input[name="dotstyle"]`) as NodeListOf<HTMLInputElement>;
  const spritesRadiosEyes = document.querySelectorAll(`#contents input[name="eyestyle"]`) as NodeListOf<HTMLInputElement>;
  const spritesRadiosIrises = document.querySelectorAll(`#contents input[name="irisstyle"]`) as NodeListOf<HTMLInputElement>;
  // const spritesDots = document.querySelector(`#contents input[name="dotstyle"][checked="checked"]`) as HTMLInputElement;
  // const spritesEyes = document.querySelector(`#contents input[name="eyestyle"][checked="checked"]`) as HTMLInputElement;
  // const spritesIrises = document.querySelector(`#contents input[name="irisstyle"][checked="checked"]`) as HTMLInputElement;
  // clicking on the label does update the checked property but not the DOM attribute checked for some reason
  const spritesDots = Array.from(spritesRadiosDots).find(e => e.checked) as HTMLInputElement;
  const spritesEyes = Array.from(spritesRadiosEyes).find(e => e.checked) as HTMLInputElement;
  const spritesIrises = Array.from(spritesRadiosIrises).find(e => e.checked) as HTMLInputElement;
  return {
    spritesSaveBtn,
    spritesDotsWrapper,
    spritesEyesWrapper,
    spritesIrisesWrapper,
    spritesDots,
    spritesEyes,
    spritesIrises,
    spritesRadiosDots,
    spritesRadiosEyes,
    spritesRadiosIrises
  };
}

function buildSpriteCheckbox(name: string, id: string, displayName: string) {
  const label = document.createElement(`label`);
  const input = document.createElement(`input`);
  input.setAttribute(`type`, `radio`);
  input.setAttribute(`name`, name);
  input.setAttribute(`value`, id);
  input.setAttribute(`class`, `no-display`);
  input.addEventListener(`change`, saveSpritesBtnOnHandler);
  // if (value && value === id)
  //   input.setAttribute(`checked`,`checked`);
  label.appendChild(input);
  const selector = document.createElement(`div`);
  selector.setAttribute(`class`, `radio-selector`);
  const preview = document.createElement(`div`);
  preview.setAttribute(`class`, `sprite-preview`);
  selector.appendChild(preview);
  const txtSpan = document.createElement(`span`);
  txtSpan.setAttribute(`class`, `txt-center`);
  const txt = document.createTextNode(displayName);
  txtSpan.appendChild(txt);
  selector.appendChild(txtSpan);
  label.appendChild(selector);
  return label;
}

function buildOneForm(container: HTMLElement, name: string, spritesArr: ISpriteListItem[]/* ,value?:string */, defaultNone?: boolean) {
  container.innerHTML = ``;
  if (defaultNone)
    container.appendChild(buildSpriteCheckbox(name, `default`, `No style (default)`));
  for (const { id, displayName } of spritesArr)
    container.appendChild(buildSpriteCheckbox(name, id, displayName));
  // if(!value)
  container.children[0].children[0].setAttribute(`checked`, `checked`);
}

export async function buildForm(): Promise<void> {
  const defaultNone = true;
  const spritesLists = await window.spriteapi.listsprites();
  const { spritesDotsWrapper, spritesEyesWrapper, spritesIrisesWrapper } = getSpritesPointers();
  buildOneForm(spritesDotsWrapper, `dotstyle`, spritesLists.dots);
  buildOneForm(spritesEyesWrapper, `eyestyle`, spritesLists.eyes, defaultNone);
  buildOneForm(spritesIrisesWrapper, `irisstyle`, spritesLists.irises, defaultNone);
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
  else setStyleValue(`dotstyle`, `default`);
  if (appData.style.spritesEyes)
    setStyleValue(`eyestyle`, appData.style.spritesEyes);
  if (appData.style.spritesIrises)
    setStyleValue(`irisstyle`, appData.style.spritesIrises);
}

export function saveSpritesBtnOnHandler(): void {
  const { spritesSaveBtn } = getSpritesPointers();
  disableBtn(spritesSaveBtn, false);
}

export function readSpriteForm(): IApplicationDataStyle {
  const {
    spritesDots,
    spritesEyes,
    spritesIrises
  } = getSpritesPointers();
  const style: IApplicationDataStyle = {};
  style.spritesDots = spritesDots.value || ``;
  style.spritesEyes = spritesEyes.value || ``;
  style.spritesIrises = spritesIrises.value || ``;
  return style;
}

export async function saveSpritesHandler(event: Event): Promise<void> {
  const { spritesSaveBtn } = getSpritesPointers();

  const style = readSpriteForm();

  await window.dataapi.setappdata({ style });

  window.userMessage(`Sprites saved`);
  disableBtn(spritesSaveBtn, true);
}