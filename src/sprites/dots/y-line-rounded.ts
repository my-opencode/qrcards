import { DotSprites } from "../DotSprites";

const definitions = `
  <path id="threeFourTb" d="M7.7,0V100H92.3V0H7.7z"/>
  <path id="1--b-" d="M7.7,42.3V100h84.6V42.3C92.3,18.9,73.4,0,50,0S7.7,18.9,7.7,42.3z"/>
  <path id="1t---" d="M7.7,57.7V0h84.6V57.7C92.3,81.1,73.4,100,50,100S7.7,81.1,7.7,57.7z"/>
  <path id="1----" d="M50,7.7c23.4,0,42.3,18.9,42.3,42.3S73.4,92.3,50,92.3S7.7,73.4,7.7,50S26.6,7.7,50,7.7z"/>`;
const useIds = {
  // "0----": " ",
  // "0t---": " ",
  // "0-r--": " ",
  // "0--b-": " ",
  // "0---l": " ",
  // "0tr--": " ",
  // "0t-b-": " ",
  // "0t--l": " ",
  // "0-rb-": " ",
  // "0-r-l": " ",
  // "0--bl": " ",
  // "0trb-": " ",
  // "0t-bl": " ",
  // "0tr-l": " ",
  // "0-rbl": " ",
  // "0trbl": " ",
  "1----": "1----",
  "1t---": "1t---",
  "1-r--": "1-r--",
  "1--b-": "1--b-",
  "1---l": "1---l",
  "1tr--": "1t---",
  "1t-b-": "threeFourTb",
  "1t--l": "1t---",
  "1-rb-": "1--b-",
  "1-r-l": "1----",
  "1--bl": "1--b-",
  "1trb-": "threeFourTb",
  "1t-bl": "threeFourTb",
  "1tr-l": "1t---",
  "1-rbl": "1--b-",
  "1trbl": "threeFourTb",
};
export const sprites = new DotSprites(`Rounded Vertical lines`,definitions, useIds);
