import { IrisSprites, IEyePosObj } from "../IrisSprites";


const definitions = `
<path id="iris-tr" x="0" y="0" d="153.5,300 0,149.5 0,0 149.5,0 300,153.5 300,300"/>
<path id="iris-tl" x="0" y="0" d="146.5,300 300,149.5 300,0 150.5,0 0,153.5 0,300"/>
<path id="iris-bl" x="0" y="0" d="146.5,300 300,149.5 300,0 150.5,0 0,153.5 0,300"/>
2z"/>`;

const useIds: IEyePosObj = {
    "topleft": "iris-tl",
    "topright": "iris-tr",
    "bottomleft": "iris-bl",
};

export const sprites = new IrisSprites(
    `Style 9`,
    definitions,
    useIds
);