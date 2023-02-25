import { IrisSprites, IEyePosObj } from "../IrisSprites";

const path = `M0,300C17.7,200.2,17.7,99.9,0,0c50,8.9,100.2,13.3,150,13.3S250,8.8,300,0
c-17.7,99.8-17.7,200.1,0,300c-50-8.9-100.2-13.3-150-13.3S50,291.1,0,300z`;

const definitions = `<path id="iris" x="0" y="0" d="${path}">`;

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