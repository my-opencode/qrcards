
import { IrisSprites, IEyePosObj } from "../IrisSprites";


const definitions = `<circle id="iris" cx="297.1" cy="297.1" r="297.1"/>`;

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
  return `<use xlink:href="#dot" class="${classes||this.defaultClass}" x="${x + halfStep}" y="${y + halfStep}" />`;
};