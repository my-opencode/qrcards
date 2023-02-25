
import { IrisSprites, IEyePosObj } from "../IrisSprites";

const definitions = `<g id="iris">
<path class="st5" d="M50,3c26,0,47,19.9,47,44.3v205.3c0,24.5-21.1,44.3-47,44.3l0,0c-26,0-47-19.9-47-44.3V47.4
    C3,22.9,24.1,3,50,3L50,3z"/>
<path class="st5" d="M250,3c26,0,47,19.9,47,44.3v205.3c0,24.5-21.1,44.3-47,44.3l0,0c-26,0-47-19.9-47-44.3V47.4
    C202.9,22.9,224,3,250,3L250,3z"/>
<path class="st5" d="M150,3c26,0,47,19.9,47,44.3v205.3c0,24.5-21.1,44.3-47,44.3l0,0c-26,0-47-19.9-47-44.3V47.4
    C103,22.9,124,3,150,3L150,3z"/>
</g>`;


const useIds: IEyePosObj = {
    "topleft": "iris",
    "topright": "iris",
    "bottomleft": "iris",
};

export const sprites = new IrisSprites(
    `Vertical rounded Bars`,
    definitions,
    useIds
);