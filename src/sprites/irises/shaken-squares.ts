import { IrisSprites, IEyePosObj } from "../IrisSprites";

const definitions = `
    <g id="iris">
    <polygon  points="13,0 0,87 87,100 100,13"/>
    <polygon  points="100,17 183,0 200,83 117,100"/>
    <polygon  points="200,10 290,0 300,90 200,100"/>
    <polygon  points="5,125 75,105 195,175 25,195"/>
    <polygon  points="65,63 62,232 228,238 236,68"/>
    <polygon  points="215,105 205,185 285,195 295,115"/>
    <polygon  points="0,215 85,200 100,285 15,300"/>
    <polygon  points="100,212 188,200 200,288 112,300"/>
    <polygon  points="222,200 200,278 278,300 300,222"/>
    </g>`;

const useIds: IEyePosObj = {
    "topleft": "iris",
    "topright": "iris",
    "bottomleft": "iris",
};

export const sprites = new IrisSprites(
    `Shaken squares`,
    definitions,
    useIds
);