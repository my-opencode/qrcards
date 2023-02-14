import { DotSprites } from "../DotSprites";

const definitions = `
  <path id="threeFourLr" d="M0,7.7H100V92.3H0V7.7z"/>
  <path id="1-r--" d="M42.3,7.7H100v84.6H42.3C18.9,92.3,0,73.4,0,50S18.9,7.7,42.3,7.7z"/>
  <path id="1---l" d="M57.7,7.7H0v84.6H57.7C81.1,92.3,100,73.4,100,50S81.1,7.7,57.7,7.7z"/>
  <path id="1----" d="M50,0c27.7,0,50,22.3,50,50s-22.3,50-50,50S0,77.7,0,50S22.3,0,50,0z"/>`;
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
  "1t---": "1----",
  "1-r--": "1-r--",
  "1--b-": "1----",
  "1---l": "1---l",
  "1tr--": "1-r--",
  "1t-b-": "1----",
  "1t--l": "1---l",
  "1-rb-": "1-r--",
  "1-r-l": "threeFourLr",
  "1--bl": "1---l",
  "1trb-": "1-r--",
  "1t-bl": "1---l",
  "1tr-l": "threeFourLr",
  "1-rbl": "threeFourLr",
  "1trbl": "threeFourLr",
};
export const sprites = new DotSprites(`Rounded horizontal lines`,definitions, useIds);
