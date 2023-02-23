import { Sprites } from "./Sprites";
export interface IStrObj { [key: string]: string }

export class DotSprites extends Sprites {
  useIds: IStrObj;
  category = `dot`
  constructor(name: string, definitions: string, useIds: IStrObj, defaultClass?: string) {
    super(name, definitions, defaultClass);
    this.useIds = useIds;
  }
  use(this: DotSprites, x: number, y: number, id?: keyof typeof this.useIds, classes?: string): string {
    return !this.useIds[id]
      ? ``
      : `<use href="#${this.useIds[id]}" class="${classes || this.defaultClass}" x="${x}" y="${y}" />`;
  }
}

