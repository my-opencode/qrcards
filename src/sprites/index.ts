import { ISpritesLists } from "../types";
import { DotSprites } from "./DotSprites";
import { EyeSprites } from "./EyeSprites";
import { IrisSprites } from "./IrisSprites";

function nameToId(n: string) {
  const id = n.toLowerCase().replace(/\s+/g, `-`);
  return id;
}

type IIdSpriteArr<T extends DotSprites> = [string, T, string];

function toIdSpriteArr<T extends DotSprites>(sprites: T): IIdSpriteArr<T> {
  return [nameToId(sprites.displayName), sprites, sprites.preview()];
}

import { sprites as dotSquare } from "./dots/default";
import { sprites as dotShakenSquares } from "./dots/shaken-squares";
import { sprites as dotSquareSmall } from "./dots/square-small";
import { sprites as dotCircle } from "./dots/circle";
import { sprites as dotCircleSmall } from "./dots/circle-small";
import { sprites as dotPointyRoundedRounded } from "./dots/pointy-rounded-rounded";
import { sprites as dotClawClawCircle } from "./dots/claw-claw-circle";
import { sprites as dotPointySquareSquare } from "./dots/pointy-square-square";
import { sprites as dotPointyClippedLosange } from "./dots/pointy-clipped-losange";
import { sprites as dotXLines } from "./dots/x-line-rounded";
import { sprites as dotPointyConcaveRounded } from "./dots/pointy-concave-rounded-circle";
import { sprites as dotRoundedRoundedCircle } from "./dots/rounded-rounded-circle";
import { sprites as dotYLines } from "./dots/y-line-rounded";

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

export const dotsprites: IIdSpriteArr<DotSprites>[] = [
  toIdSpriteArr(dotSquare),
  toIdSpriteArr(dotCircle),
  toIdSpriteArr(dotClawClawCircle),
  toIdSpriteArr(dotRoundedRoundedCircle),
  toIdSpriteArr(dotCircleSmall),
  toIdSpriteArr(dotShakenSquares),
  toIdSpriteArr(dotPointyRoundedRounded),
  toIdSpriteArr(dotPointySquareSquare),
  toIdSpriteArr(dotPointyClippedLosange),
  toIdSpriteArr(dotPointyConcaveRounded),
  toIdSpriteArr(dotSquareSmall),
  toIdSpriteArr(dotXLines),
  toIdSpriteArr(dotYLines),
];

export const eyesprites: IIdSpriteArr<EyeSprites>[] = [
  toIdSpriteArr(eyeRounded),
  toIdSpriteArr(eyeRoundedOutside),
  toIdSpriteArr(eyeShakenSquares),
  toIdSpriteArr(eyeBiscuit),
  toIdSpriteArr(eyePointySkewed),
  toIdSpriteArr(eyeCircleChain),
  toIdSpriteArr(eyeClippedDiagonalCenter),
  toIdSpriteArr(eyePointyDiagonalCenter),
  toIdSpriteArr(eyeDialogBox),
  toIdSpriteArr(eyeCircleChainDense),
  toIdSpriteArr(eyePointTopLeft),
  toIdSpriteArr(eyePointyChain),
];

export const irissprites: IIdSpriteArr<IrisSprites>[] = [
  toIdSpriteArr(irisRounded),
  toIdSpriteArr(irisRoundedOneCorner),
  toIdSpriteArr(irisShakenSquares),
  toIdSpriteArr(irisBiscuit),
  toIdSpriteArr(irisSkewedOutside),
  toIdSpriteArr(irisNineCircles),
  toIdSpriteArr(irisRoundedClipped),
  toIdSpriteArr(irisGems),
  toIdSpriteArr(irisDialogBox),
  toIdSpriteArr(irisConcaveSquare),
  toIdSpriteArr(irisTorn),
  toIdSpriteArr(irisVerticalRoundedBars),
  toIdSpriteArr(irisCircle),
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
  const dots = dotsprites.map(([id, sprites, preview]) => ({ id, displayName: sprites.displayName, preview }));
  const eyes = eyesprites.map(([id, sprites, preview]) => ({ id, displayName: sprites.displayName, preview }));
  const irises = irissprites.map(([id, sprites, preview]) => ({ id, displayName: sprites.displayName, preview }));
  return { dots, eyes, irises };
}

