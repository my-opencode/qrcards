import { DotSprites } from "../DotSprites";

const definitions = `
		  <path id="1----" d="M100,65.6c0,9.5-3.4,17.6-10.1,24.3C83.2,96.6,75.1,100,65.6,100H34.4
			c-9.5,0-17.6-3.4-24.3-10.1C3.4,83.2,0,75.1,0,65.6V34.4c0-9.5,3.4-17.6,10.1-24.3S24.9,0,34.4,0h31.2c9.5,0,17.6,3.4,24.3,10.1
			S100,24.9,100,34.4V65.6z"/>
      <path id="1t---" d="M100,59.4V0H0v59.4L50,100L100,59.4z"/>
      <path id="1-r--" d="M40.6,0H100v100H40.6L0,50L40.6,0z"/>
      <path id="1--b-" d="M100,40.6V100H0V40.6L50,0L100,40.6z"/>
      <path id="1---l" d="M59.4,0H0v100h59.4L100,50L59.4,0z"/>
      <path id="1tr--" d="M100,0H0v65.6c0,9.5,3.4,17.6,10.1,24.3S24.9,100,34.4,100H100V0z"/>
      <path id="1t--l" d="M100,0H0v100h65.6c9.5,0,17.6-3.4,24.3-10.1S100,75.1,100,65.6C100,65.6,100,0,100,0z"/>
      <path id="1-rb-" d="M100,34.4V0H34.4c-9.5,0-17.6,3.4-24.3,10.1S0,24.9,0,34.4V100h100V34.4z"/>
      <path id="1--bl" d="M100,34.4c0-9.5-3.4-17.6-10.1-24.3S75.1,0,65.6,0H0v100h100V34.4z"/>
      <rect id="threeFourTbLr" y="0" width="100" height="100"/>`;
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
export const sprites = new DotSprites(`Pointy rounded`,definitions, useIds);
