import { ISpriteListItem, ISpritesLists } from "../types";
import { DotSprites } from "./DotSprites";

import { sprites as s1 } from "./dots/circle";
import { sprites as s2 } from "./dots/pointy-rounded";
import { sprites as s3 } from "./dots/rounded-arc";
import { sprites as s4 } from "./dots/rounded-straight";
import { sprites as s5 } from "./dots/claw-rounded";
import { sprites as s6 } from "./dots/pointy-square";
import { sprites as s7 } from "./dots/rounded-concave-small-zero";
import { sprites as s8 } from "./dots/sharp-rounded";
import { sprites as s9 } from "./dots/default-square";
import { sprites as s10 } from "./dots/pointy-straight";
import { sprites as s11 } from "./dots/rounded-concave-square";
import { sprites as s12 } from "./dots/x-line-rounded";
import { sprites as s13 } from "./dots/pointy-concave-rounded";
import { sprites as s14 } from "./dots/rounded";
import { sprites as s15 } from "./dots/rounded-diagonal";
import { sprites as s16 } from "./dots/y-line-rounded";
const dotsprites: [string, DotSprites][] = [
  ["circle",
    s1],
  ["pointy-rounded",
    s2],
  ["rounded-arc",
    s3],
  ["rounded-straight",
    s4],
  ["claw-rounded",
    s5],
  ["pointy-square",
    s6],
  ["rounded-concave-small-zero",
    s7],
  ["sharp-rounded",
    s8],
  ["default-square",
    s9],
  ["pointy-straight",
    s10],
  ["rounded-concave-square",
    s11],
  ["x-line-rounded",
    s12],
  ["pointy-concave-rounded",
    s13],
  ["rounded",
    s14],
  ["rounded-diagonal",
    s15],
  ["y-line-rounded",
    s16],
];
import { sprites as e1 } from "./eyes/rounded";
const eyesprites: [string, EyeSprites][] = [[`rounded`, e1]];
import { sprites as i1 } from "./irises/rounded";
import { EyeSprites } from "./EyeSprites";
import { IrisSprites } from "./IrisSprites";
const irissprites: [string, IrisSprites][] = [[`rounded`, i1]];

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

export function listAllSpritesHandler(event: Event): ISpritesLists {
  const dots = dotsprites.map(([id, sprites]) => ({ id, displayName: sprites.displayName }));
  const eyes = eyesprites.map(([id, sprites]) => ({ id, displayName: sprites.displayName }));
  const irises = irissprites.map(([id, sprites]) => ({ id, displayName: sprites.displayName }));
  return { dots, eyes, irises };
}

