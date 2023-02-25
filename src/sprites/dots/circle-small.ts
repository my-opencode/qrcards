import { DotSprites } from "../DotSprites";

const definitions = `<circle id="dot" cx="0" cy="0" r="40" />`;

const useIds = {
  // "0----": "",
  // "0t---": "",
  // "0-r--": "",
  // "0--b-": "",
  // "0---l": "",
  // "0tr--": "",
  // "0t-b-": "",
  // "0t--l": "",
  // "0-rb-": "",
  // "0-r-l": "",
  // "0--bl": "",
  // "0trb-": "",
  // "0t-bl": "",
  // "0tr-l": "",
  // "0-rbl": "",
  // "0trbl": "",
  "1----": "dot",
  "1t---": "dot",
  "1-r--": "dot",
  "1--b-": "dot",
  "1---l": "dot",
  "1tr--": "dot",
  "1t-b-": "dot",
  "1t--l": "dot",
  "1-rb-": "dot",
  "1-r-l": "dot",
  "1--bl": "dot",
  "1trb-": "dot",
  "1t-bl": "dot",
  "1tr-l": "dot",
  "1-rbl": "dot",
  "1trbl": "dot",
};

export const sprites = new DotSprites(
  `Small Circle`,
  definitions,
  useIds
);
sprites.use = function(this:DotSprites, x:number, y:number,id:string,classes?:string){
  const halfStep = 5;
  return `<use xlink:href="#${this.useIds[id]||`dot`}" class="${classes||this.defaultClass}" x="${x + halfStep}" y="${y + halfStep}" />`;
};

