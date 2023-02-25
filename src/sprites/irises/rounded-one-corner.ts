import { IrisSprites, IEyePosObj } from "../IrisSprites";


const definitions = `
<path id="iris-tl" x="0" y="0" d="M300.2,2.9v300H0.2L0.3,85.8c0-45.7,36.5-82.9,81.4-82.9h136.6c14,0,34.5,0,51.5,0
C286.7,2.9,300.2,2.9,300.2,2.9z"/>
<path id="iris-tr" x="0" y="0" d="M0,2.9v300h300l-0.1-217.1c0-45.7-36.5-82.9-81.4-82.9H81.9c-14,0-34.5,0-51.5,0
C13.5,2.9,0,2.9,0,2.9z"/>
<path id="iris-bl" x="0" y="0" d="M300.2,302.8V2.9H0.2L0.3,220c0,45.7,36.5,82.9,81.4,82.9h136.6c14,0,34.5,0,51.5,0
C286.7,302.8,300.2,302.8,300.2,302.8z"/>`;

const useIds: IEyePosObj = {
    "topleft": "iris-tl",
    "topright": "iris-tr",
    "bottomleft": "iris-bl",
};

export const sprites = new IrisSprites(
    `Rounded One Corner`,
    definitions,
    useIds
);