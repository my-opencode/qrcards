import { Sprites } from "./Sprites";

export class EyeSprites extends Sprites {
  category = `eye`
}

// <use xlink:href="#eye-rounded" x="0" y="0" class="${classes || `eye0`}" />
// <use xlink:href="#eye-rounded" x="${width - (7*step)}" y="0" class="${classes || `eye0`}" />
// <use xlink:href="#eye-rounded" x="0" y="${width - (7*step)}" class="${classes || `eye0`}" />