import { EyeSprites, IEyePosObj } from "./EyeSprites";
import { spritePreviewIris } from "./preview";
export { IEyePosObj };
export class IrisSprites extends EyeSprites {
  category = `iris`;
  preview():string{
    return spritePreviewIris(this);
  }
}
