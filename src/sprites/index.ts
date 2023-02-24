import { ISpritesLists } from "../types";
import { DotSprites } from "./DotSprites";

function nameToId (n:string) {
  const id = n.toLowerCase().replace(/\s+/g,`-`);
  console.log(`name to id : "${n}" => "${id}"`);
  return id;
}

import { sprites as s1 } from "./dots/circle";
import { sprites as s2 } from "./dots/pointy-rounded";
import { sprites as s3 } from "./dots/rounded-arc";
import { sprites as s4 } from "./dots/rounded-straight";
import { sprites as s5 } from "./dots/claw-rounded";
import { sprites as s6 } from "./dots/pointy-square";
import { sprites as s7 } from "./dots/rounded-concave-small-zero";
import { sprites as s8 } from "./dots/sharp-rounded";
import { sprites as s9 } from "./dots/default";
import { sprites as s10 } from "./dots/pointy-straight";
import { sprites as s11 } from "./dots/rounded-concave-square";
import { sprites as s12 } from "./dots/x-line-rounded";
import { sprites as s13 } from "./dots/pointy-concave-rounded";
import { sprites as s14 } from "./dots/rounded";
import { sprites as s15 } from "./dots/rounded-diagonal";
import { sprites as s16 } from "./dots/y-line-rounded";

import { sprites as e1 } from "./eyes/circle-chain";
import { sprites as e2 } from "./eyes/circle-chain-2";
import { sprites as e3 } from "./eyes/point-top-left";
import { sprites as e4 } from "./eyes/rounded";
import { sprites as e5 } from "./eyes/style-10";
import { sprites as e6 } from "./eyes/style-3";
import { sprites as e7 } from "./eyes/style-4";
import { sprites as e8 } from "./eyes/style-5";
import { sprites as e9 } from "./eyes/style-6";
import { sprites as e10 } from "./eyes/style-7";
import { sprites as e11 } from "./eyes/style-8";
import { sprites as e12 } from "./eyes/style-9";

import { sprites as i1 } from "./irises/circle";
import { sprites as i2 } from "./irises/shaken-squares";
import { sprites as i3 } from "./irises/iris-10";
import { sprites as i4 } from "./irises/nine-circle";
import { sprites as i5 } from "./irises/iris-3";
import { sprites as i6 } from "./irises/iris-4";
import { sprites as i7 } from "./irises/iris-5";
import { sprites as i8 } from "./irises/iris-6";
import { sprites as i9 } from "./irises/iris-7";
import { sprites as i10 } from "./irises/iris-8";
import { sprites as i11 } from "./irises/iris-9";
import { sprites as i12 } from "./irises/nine-circles";
import { sprites as i13 } from "./irises/rounded";
import { sprites as i14 } from "./irises/rounded-one-corner";

export const dotsprites: [string, DotSprites][] = [
  ["default",
    s9],
  ["circle",
    s1],
  ["claw-rounded",
    s5],
  ["rounded",
    s14],
  ["rounded-arc",
    s3],
  ["rounded-concave-square",
    s11],
  ["rounded-concave-small-zero",
    s7],
  ["rounded-diagonal",
    s15],
  ["rounded-straight",
    s4],
  ["pointy-rounded",
    s2],
  ["pointy-square",
    s6],
  ["pointy-straight",
    s10],
  ["pointy-concave-rounded",
    s13],
  ["sharp-rounded",
    s8],
  ["x-line-rounded",
    s12],
  ["y-line-rounded",
    s16],
];

export const eyesprites: [string, EyeSprites][] = [
  [nameToId(e1.displayName), e1],
  [nameToId(e2.displayName), e2],
  [nameToId(e3.displayName), e3],
  [nameToId(e4.displayName), e4],
  [nameToId(e5.displayName), e5],
  [nameToId(e6.displayName), e6],
  [nameToId(e7.displayName), e7],
  [nameToId(e8.displayName), e8],
  [nameToId(e9.displayName), e9],
  [nameToId(e10.displayName), e10],
  [nameToId(e11.displayName), e11],
  [nameToId(e12.displayName), e12],
];
import { EyeSprites } from "./EyeSprites";
import { IrisSprites } from "./IrisSprites";
export const irissprites: [string, IrisSprites][] = [

  [nameToId(i1.displayName), i1],
  [nameToId(i2.displayName), i2],
  [nameToId(i3.displayName), i3],
  [nameToId(i4.displayName), i4],
  [nameToId(i5.displayName), i5],
  [nameToId(i6.displayName), i6],
  [nameToId(i7.displayName), i7],
  [nameToId(i8.displayName), i8],
  [nameToId(i9.displayName), i9],
  [nameToId(i10.displayName), i10],
  [nameToId(i11.displayName), i11],
  [nameToId(i12.displayName), i12],
  [nameToId(i13.displayName), i13],
  [nameToId(i14.displayName), i14],
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

