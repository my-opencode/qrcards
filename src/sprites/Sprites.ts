export class Sprites {
  displayName: string;
  definitions: string;
  defaultClass: string;
  constructor(name:string, definitions: string, defaultClass?: string) {
    this.displayName=name;
    this.definitions = scaleSprites(10, definitions);
    this.defaultClass = defaultClass || ``;
  }
  use( x: number, y: number, id?: string, classes?: string): string {
    return !id
      ? ``
      : `<use href="#${id}" class="${classes || this.defaultClass}" x="${x}" y="${y}" />`;
  }
}
function scaleSprites(step: number, sprites: string) {
  const multiplier = step / 100;
  // todo warn about the id numbers being replaced
  return sprites.replace(/[0-9.]+/g, k => (parseFloat(k) * multiplier).toFixed(3)).replace(/id="0.100/g,`id="1`);
}