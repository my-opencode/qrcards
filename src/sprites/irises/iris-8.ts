import { IrisSprites, IEyePosObj } from "../IrisSprites";


const definitions = `
<path id="iris-tr" x="0" y="0" d="M64.4,300c-19.9,0-38.9-20.6-41.9-39.7L0,0l264.4,16.9c18.6,2.8,33.3,20.5,33.3,41.6L300,300H64.4z"/>
<path id="iris-tl" x="0" y="0" d="M235.8,300c19.9,0,38.9-20.6,41.9-39.7L300.2,0L35.8,16.9C17.2,19.7,2.5,37.4,2.5,58.5L0.2,300H235.8z"/>
<path id="iris-bl" x="0" y="0" d="M64.4,0C44.5,0,25.5,20.6,22.5,39.7L0,300l264.4-16.9c18.6-2.8,33.3-20.5,33.3-41.6L300,0H64.4z"/>
2z"/>`;

const useIds: IEyePosObj = {
    "topleft": "iris-tl",
    "topright": "iris-tr",
    "bottomleft": "iris-bl",
};

export const sprites = new IrisSprites(
    `Style 8`,
    definitions,
    useIds
);