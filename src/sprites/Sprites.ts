interface IStrObj { [key: string]: string }
export class Sprites {
  displayname: string;
  definitions: string;
  useIds: IStrObj;
  defaultClass: string;
  constructor(name:string, definitions: string, useIds: IStrObj, defaultClass?: string) {
    this.displayname=name;
    this.definitions = scaleSprites(10, definitions);
    this.useIds = useIds;
    this.defaultClass = defaultClass || ``;
  }
  use(id: keyof typeof this.useIds, x: number, y: number, classes: string): string {
    return !this.useIds[id]
      ? ``
      : `<use xlink:href="#${this.useIds[id]}" class="${classes || this.defaultClass}" x="${x}" y="${y}" />`;
  }
}
function scaleSprites(step: number, sprites: string) {
  const multiplier = step / 100;
  return sprites.replace(/[0-9.]+/g, k => (parseFloat(k) * multiplier).toFixed(3));
}