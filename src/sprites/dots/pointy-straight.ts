import { DotSprites } from "../DotSprites";

const definitions = `
		<polygon id="1----" points="100,50 100,50 50,0 0,50 0,50 0,50 0,50 50,100 100,50 100,50$/>
		<path id="1t---" d="M100,59.4V0H0v59.4L50,100L100,59.4z$/>
		<path id="1-r--" d="M40.6,0H100v100H40.6L0,50L40.6,0z$/>
		<path id="1--b-" d="M100,40.6V100H0V40.6L50,0L100,40.6z$/>
		<path id="1---l" d="M59.4,0H0v100h59.4L100,50L59.4,0z$/>
		<path id="1tr--" d="M34.4,100H100V0H0v65.6$/>
		<path id="1t--l" d="M100,65.6V0H0v100h65.6$/>
		<path id="1-rb-" d="M0,34.4V100h100V34.4V0H34.4$/>
		<path id="1--bl" d="M100,34.4L65.6,0H0v100h100V34.4z$/>
		<rect id="threeFourTbRl" y="0" width="100" height="100"/>`;
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
  "1t-b-": "threeFourTbRl",
  "1t--l": "1t--l",
  "1-rb-": "1-rb-",
  "1-r-l": "threeFourTbRl",
  "1--bl": "1--bl",
  "1trb-": "threeFourTbRl",
  "1t-bl": "threeFourTbRl",
  "1tr-l": "threeFourTbRl",
  "1-rbl": "threeFourTbRl",
  "1trbl": "threeFourTbRl",
};
export const sprites = new DotSprites(`Pointy square`,definitions, useIds);
