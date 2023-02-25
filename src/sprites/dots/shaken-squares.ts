import { DotSprites } from "../DotSprites";

const definitions = `<rect id="dot" x="6.5" y="6.5" width="87" height="87"/>`;

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
  `Shaken squares`,
  definitions,
  useIds
);

sprites.use = function (this: DotSprites, x: number, y: number, id: string, classes?: string) {
  const halfStep = 5;
  const angleSelector = Math.trunc(Math.random()*3.999);
  const angle = angleSelector === 0 ? 0 : angleSelector === 1 ? 10 : angleSelector === 2 ? -13 : 20;
  return `<use xlink:href="#${this.useIds[id] || `dot`}" class="${classes || this.defaultClass}" x="${x}" y="${y}" transform="rotate(${angle} ${x+halfStep} ${y+halfStep})" />`;
};
