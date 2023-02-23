import { DotSprites, IStrObj } from "./DotSprites";

export interface IEyePosObj extends IStrObj { 
  topleft: string,
  topright: string,
  bottomleft: string,
}
export class EyeSprites extends DotSprites {
  category = `eye`;
  useIds: IEyePosObj;
}

// <use xlink:href="#eye-rounded" x="0" y="0" class="${classes || `eye0`}" />
// <use xlink:href="#eye-rounded" x="${width - (7*step)}" y="0" class="${classes || `eye0`}" />
// <use xlink:href="#eye-rounded" x="0" y="${width - (7*step)}" class="${classes || `eye0`}" />