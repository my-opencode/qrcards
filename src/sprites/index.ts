import fs from "fs/promises";
import path from "path";
import { Sprites } from "./Sprites";
import { DotSprites } from "./DotSprites";
import { EyeSprites } from "./EyeSprites";
import { IrisSprites } from "./IrisSprites";

export interface ISpriteListItem {
  id: string,
  sprites: Sprites | DotSprites | EyeSprites | IrisSprites
}

export async function getSprites(dir: string): Promise<ISpriteListItem[]> {
  const files = await fs.readdir(dir);
  const sprites = await Promise.all(
    files.map(async fn => {
      const id = fn.slice(0, -3);
      const { sprites } = await import(path.resolve(dir, fn));
      return { id, sprites };
    }
    )
  );
  return sprites;
}

export function getDotSprites(): Promise<ISpriteListItem[]> {
  return getSprites(`dots`);
}

export function getEyeSprites(): Promise<ISpriteListItem[]> {
  return getSprites(`eyes`);
}

export function getIrisSprites(): Promise<ISpriteListItem[]> {
  return getSprites(`irises`);
}