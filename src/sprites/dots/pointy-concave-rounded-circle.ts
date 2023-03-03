import { DotSprites } from "../DotSprites";
const definitions = `
    <path id="1----" d="M95,64.1c0,8.6-3,15.9-9.1,21.9c-6,6-13.3,9.1-21.9,9.1H35.9c-8.6,0-15.8-3-21.9-9.1
    c-6-6.1-9-13.4-9-21.9V35.9c0-8.6,3-15.8,9.1-21.9s13.3-9,21.8-9H64c8.6,0,15.9,3,21.9,9.1S95,27.4,95,35.9V64.1z"/>
    <path id="1t---" d="M100,100V0H0v100l50-28.1L100,100z"/>
    <path id="1-r--" d="M0,100h100V0H0l28.1,50L0,100z"/>
    <path id="1--b-" d="M0,0v100h100V0L50,28.1L0,0z"/>
    <path id="1---l" d="M100,0H0v100h100L71.9,50L100,0z"/>
		<path id="1tr--" d="M100,0H0v65.6c0,9.5,3.4,17.6,10.1,24.3S24.9,100,34.4,100H100V0z"/>
		<path id="1t--l" d="M100,0H0v100h65.6c9.5,0,17.6-3.4,24.3-10.1S100,75.1,100,65.6C100,65.6,100,0,100,0z"/>
		<path id="1-rb-" d="M100,34.4V0H34.4c-9.5,0-17.6,3.4-24.3,10.1S0,24.9,0,34.4V100h100V34.4z"/>
		<path id="1--bl" d="M100,34.4c0-9.5-3.4-17.6-10.1-24.3S75.1,0,65.6,0H0v100h100V34.4z"/>
		<rect id="threeFourTbLr" x="0" y="0" width="100" height="100"/>`;

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
  "1tr--": "1tr--",
  "1t-b-": "threeFourTbLr",
  "1t--l": "1t--l",
  "1-rb-": "1-rb-",
  "1-r-l": "threeFourTbLr",
  "1--bl": "1--bl",
  "1trb-": "threeFourTbLr",
  "1t-bl": "threeFourTbLr",
  "1tr-l": "threeFourTbLr",
  "1-rbl": "threeFourTbLr",
  "1trbl": "threeFourTbLr",
};
export const sprites = new DotSprites(`End: Pointy inward, \nCorner: rounded, \nDot: circle`, definitions, useIds);
