import { spritePreviewDots } from "./preview";
import { Sprites } from "./Sprites";
export interface IStrObj { [key: string]: string }

export class DotSprites extends Sprites {
  useIds: IStrObj;
  category = `dot`
  constructor(name: string, definitions: string, useIds: IStrObj, defaultClass?: string) {
    super(name, definitions, defaultClass);
    this.useIds = useIds;
    this.makeIdsUnique();
  }
  use(this: DotSprites, x: number, y: number, id?: keyof typeof this.useIds, classes?: string): string {
    return !this.useIds[id]
      ? ``
      : `<use href="#${this.useIds[id]}" class="${classes || this.defaultClass}" x="${x}" y="${y}" />`;
  }
  preview(): string {
    return spritePreviewDots(this);
  }
  makeIdsUnique(): void {
    const uniqueSuffix = `_${Math.trunc(Math.random() * 9999)}-${Date.now()}`;
    const done = new Map();
    for (const k in this.useIds) {
      if (!done.has(this.useIds[k])) {
        const oldId = this.useIds[k];
        const newId = this.useIds[k] + uniqueSuffix;
        this.definitions = this.definitions.replace(oldId, newId);
        this.useIds[k] = newId;
        done.set(oldId, newId);
      } else {
        this.useIds[k] = done.get(this.useIds[k]);
      }
    }
    // console.log(this.definitions);
    // console.log(this.useIds);
  }
}

