import { DotSprites } from "../DotSprites";

const definitions = `
		<rect id="zeroTwoThreeFour" y="0" width="100" height="100"/>
		<path id="1---l" d="M59.4,0H0v100h59.4L100,50L59.4,0z"/>
		<path id="1--b-" d="M100,40.6V100H0V40.6L50,0L100,40.6z"/>
		<path id="1-r--" d="M40.6,0H100v100H40.6L0,50L40.6,0z"/>
		<path id="1t---" d="M100,59.4V0H0v59.4L50,100L100,59.4z"/>`;
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
  "1----": "zeroTwoThreeFour",
  "1t---": "1t---",
  "1-r--": "1-r--",
  "1--b-": "1--b-",
  "1---l": "1---l",
  "1tr--": "zeroTwoThreeFour",
  "1t-b-": "zeroTwoThreeFour",
  "1t--l": "zeroTwoThreeFour",
  "1-rb-": "zeroTwoThreeFour",
  "1-r-l": "zeroTwoThreeFour",
  "1--bl": "zeroTwoThreeFour",
  "1trb-": "zeroTwoThreeFour",
  "1t-bl": "zeroTwoThreeFour",
  "1tr-l": "zeroTwoThreeFour",
  "1-rbl": "zeroTwoThreeFour",
  "1trbl": "zeroTwoThreeFour",
};
export const sprites = new DotSprites(`Ends: pointy, corners: square, dot: square`,definitions, useIds);
