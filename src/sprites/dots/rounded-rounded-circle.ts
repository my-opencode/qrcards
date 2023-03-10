import { DotSprites } from "../DotSprites";

const definitions = `
<rect id="threeFourTbLr" x="0" y="0"  width="100" height="100"/>
<path id="1----" d="M50,0c27.7,0,50,22.3,50,50s-22.3,50-50,50S0,77.7,0,50S22.3,0,50,0z"/>
<path id="1t---" d="M0,50C0,38.3,0,0,0,0s34,0,50,0c12.6,0,50,0,50,0s0,34.9,0,50c0,27.7-22.3,50-50,50S0,77.7,0,50z"/>
<path id="1-r--" d="M50,0c11.7,0,50,0,50,0s0,34,0,50c0,12.6,0,50,0,50s-34.9,0-50,0C22.3,100,0,77.7,0,50S22.3,0,50,0z"/>
<path id="1--b-" d="M100,50c0,11.7,0,50,0,50s-34,0-50,0c-12.6,0-50,0-50,0s0-34.9,0-50C0,22.3,22.3,0,50,0S100,22.3,100,50z"/>
<path id="1---l" d="M50,100c-11.7,0-50,0-50,0s0-34,0-50C0,37.4,0,0,0,0s34.9,0,50,0c27.7,0,50,22.3,50,50S77.7,100,50,100z"/>
<path id="1tr--" d="M100,100V0H0C0,55.1,44.9,100,100,100z"/>
<path id="1t--l" d="M100,0H0v100C55.1,100,100,55.1,100,0z"/>
<path id="1-rb-" d="M0,100h100V0C44.9,0,0,44.9,0,100z"/>
<path id="1--bl" d="M0,0v100h100C100,44.9,55.1,0,0,0z"/>
`;
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

export const sprites = new DotSprites(
  `End: rounded, \nCorner: rounded, \nDot: circle`,
  definitions,
  useIds
);
