import { ISpritesLists } from "../types";
import { DotSprites } from "./DotSprites";

function nameToId(n: string) {
  const id = n.toLowerCase().replace(/\s+/g, `-`);
  console.log(`name to id : "${n}" => "${id}"`);
  return id;
}

import { sprites as s1 } from "./dots/circle";
import { sprites as s2 } from "./dots/pointy-rounded-rounded";
import { sprites as s4 } from "./dots/rounded-straight";
import { sprites as s5 } from "./dots/claw-claw-circle";
import { sprites as s6 } from "./dots/pointy-square-square";
import { sprites as s7 } from "./dots/rounded-concave-small-zero";
import { sprites as s8 } from "./dots/sharp-rounded";
import { sprites as s9 } from "./dots/default";
import { sprites as s10 } from "./dots/pointy-straight";
import { sprites as s11 } from "./dots/rounded-concave-square";
import { sprites as s12 } from "./dots/x-line-rounded";
import { sprites as s13 } from "./dots/pointy-concave-rounded";
import { sprites as s14 } from "./dots/rounded-rounded-circle";
import { sprites as s15 } from "./dots/rounded-diagonal";
import { sprites as s16 } from "./dots/y-line-rounded";

import { sprites as eyeCircleChain } from "./eyes/circle-chain";
import { sprites as eyeCircleChainDense } from "./eyes/circle-chain-dense";
import { sprites as eyePointTopLeft } from "./eyes/point-top-left";
import { sprites as eyePointyChain } from "./eyes/pointy-chain";
import { sprites as eyeShakenSquares } from "./eyes/shaken-squares";
import { sprites as eyePointySkewed } from "./eyes/pointy-skewed";
import { sprites as eyePointyDiagonalCenter } from "./eyes/pointy-diagonal-center";
import { sprites as eyeDialogBox } from "./eyes/dialog-box";
import { sprites as eyeRoundedOutside } from "./eyes/rounded-outside";
import { sprites as eyeClippedDiagonalCenter } from "./eyes/clipped-diagonal-center";
import { sprites as eyeRounded } from "./eyes/rounded";
import { sprites as eyeBiscuit } from "./eyes/biscuit";

import { sprites as irisCircle } from "./irises/circle";
import { sprites as irisConcaveSquare } from "./irises/concave-square";
import { sprites as irisShakenSquares } from "./irises/shaken-squares";
import { sprites as irisBiscuit } from "./irises/biscuit";
import { sprites as irisRoundedClipped } from "./irises/rounded-clipped";
import { sprites as irisTorn } from "./irises/torn";
import { sprites as irisDialogBox } from "./irises/dialog-box";
import { sprites as irisVerticalRoundedBars } from "./irises/vertical-rounded-bars";
import { sprites as irisSkewedOutside } from "./irises/skewed-outside";
import { sprites as irisGems } from "./irises/gems";
import { sprites as irisNineCircles } from "./irises/nine-circles";
import { sprites as irisRounded } from "./irises/rounded";
import { sprites as irisRoundedOneCorner } from "./irises/rounded-one-corner";

export const dotsprites: [string, DotSprites][] = [
  ["default", s9],
  [nameToId(s1.displayName), s1],
  [nameToId(s5.displayName), s5],
  [nameToId(s14.displayName), s14],
  [nameToId(s11.displayName), s11],
  [nameToId(s7.displayName), s7],
  [nameToId(s15.displayName), s15],
  [nameToId(s4.displayName), s4],
  [nameToId(s2.displayName), s2],
  [nameToId(s6.displayName), s6],
  [nameToId(s10.displayName), s10],
  [nameToId(s13.displayName), s13],
  [nameToId(s8.displayName), s8],
  [nameToId(s12.displayName), s12],
  [nameToId(s16.displayName), s16],
];

import { EyeSprites } from "./EyeSprites";
export const eyesprites: [string, EyeSprites][] = [
  [nameToId(eyeRounded.displayName), eyeRounded],
  [nameToId(eyeRoundedOutside.displayName), eyeRoundedOutside],
  [nameToId(eyeShakenSquares.displayName), eyeShakenSquares],
  [nameToId(eyeBiscuit.displayName), eyeBiscuit],
  [nameToId(eyePointySkewed.displayName), eyePointySkewed],
  [nameToId(eyeCircleChain.displayName), eyeCircleChain],
  [nameToId(eyeCircleChainDense.displayName), eyeCircleChainDense],
  [nameToId(eyeClippedDiagonalCenter.displayName), eyeClippedDiagonalCenter],
  [nameToId(eyePointyDiagonalCenter.displayName), eyePointyDiagonalCenter],
  [nameToId(eyePointTopLeft.displayName), eyePointTopLeft],
  [nameToId(eyePointyChain.displayName), eyePointyChain],
  [nameToId(eyeDialogBox.displayName), eyeDialogBox],
];

import { IrisSprites } from "./IrisSprites";
export const irissprites: [string, IrisSprites][] = [
  [nameToId(irisCircle.displayName), irisCircle],
  [nameToId(irisRoundedOneCorner.displayName), irisRoundedOneCorner],
  [nameToId(irisShakenSquares.displayName), irisShakenSquares],
  [nameToId(irisBiscuit.displayName), irisBiscuit],
  [nameToId(irisSkewedOutside.displayName), irisSkewedOutside],
  [nameToId(irisNineCircles.displayName), irisNineCircles],
  [nameToId(irisRoundedClipped.displayName), irisRoundedClipped],
  [nameToId(irisGems.displayName), irisGems],
  [nameToId(irisConcaveSquare.displayName), irisConcaveSquare],
  [nameToId(irisTorn.displayName), irisTorn],
  [nameToId(irisDialogBox.displayName), irisDialogBox],
  [nameToId(irisVerticalRoundedBars.displayName), irisVerticalRoundedBars],
  [nameToId(irisRounded.displayName), irisRounded],
];

// export async function getSprites(dir: string): Promise<ISpriteListItem[]> {
//   const files = await fs.readdir(dir);
//   const sprites = await Promise.all(
//     files.map(async fn => {
//       const id = fn.slice(0, -3);
//       const { sprites } = await import(path.resolve(dir, fn));
//       return { id, sprites };
//     }
//     )
//   );
//   return sprites;
// }

// export function getDotSprites(): Promise<ISpriteListItem[]> {
//   return getSprites(`dots`);
// }

// export function getEyeSprites(): Promise<ISpriteListItem[]> {
//   return getSprites(`eyes`);
// }

// export function getIrisSprites(): Promise<ISpriteListItem[]> {
//   return getSprites(`irises`);
// }

export function listAllSpritesHandler(event?: Event): ISpritesLists {
  const dots = dotsprites.map(([id, sprites]) => ({ id, displayName: sprites.displayName }));
  const eyes = eyesprites.map(([id, sprites]) => ({ id, displayName: sprites.displayName }));
  const irises = irissprites.map(([id, sprites]) => ({ id, displayName: sprites.displayName }));
  return { dots, eyes, irises };
}

