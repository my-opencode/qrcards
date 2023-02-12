import { DotSprites } from "../DotSprites";

const definitions = `<rect id="threeFourTbLr" y="0" width="100" height="100"/>
<path id="1----" d="M50,0c27.6,0,50,22.4,50,50s-22.4,50-50,50S0,77.6,0,50S22.4,0,50,0z$/>
<path id="1t---" d="M0,0h100c0,0-31.3,65.4-3.9,100C96.1,100,0,101.7,0,0z$/>
<path id="1-r--" d="M100,0v100c0,0-65.4-31.3-100-3.9C0,96.1-1.7,0,100,0z$/>
<path id="1--b-" d="M100,100H0c0,0,31.3-65.4,3.9-100C3.9,0,100-1.7,100,100z$/>
<path id="1---l" d="M0,100V0c0,0,65.4,31.3,100,3.9C100,3.9,101.7,100,0,100z$/>
<path id="1--bl" d="M100,100H0V0.2V0h24.5C66.2,0,100,44.8,100,100z$/>
<path id="1t--l" d="M0,100V0h99.8h0.2v24.5C100,66.2,55.2,100,0,100z$/>
<path id="1-rb-" d="M100,0v100H0.2H0V75.5C0,33.8,44.8,0,100,0z$/>
<path id="1tr--" d="M0,0h100v99.8v0.2H75.5C33.8,100,0,55.2,0,0z$/>`;

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
  `Rounded claws`,
  definitions,
  useIds
);
