
import { IrisSprites, IEyePosObj } from "../IrisSprites";


const definitions = `<circle id="iris" cx="0" cy="0" r="147.1"/>`;

const useIds: IEyePosObj = {
    "topleft": "iris",
    "topright": "iris",
    "bottomleft": "iris",
};

export const sprites = new IrisSprites(
    `Circle`,
    definitions,
    useIds
);
sprites.use = function(this:IrisSprites, x:number, y:number,id:string,classes?:string){
  const halfStep = 15;
  return `<use xlink:href="#${this.useIds[id]||`iris`}" class="${classes||this.defaultClass}" x="${x + halfStep}" y="${y + halfStep}" />`;
};