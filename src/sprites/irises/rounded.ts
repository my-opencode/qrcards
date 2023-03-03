import { IrisSprites, IEyePosObj } from "../IrisSprites";

const definitions = `<path id="iris" x="0" y="0" d="M82.1,300C36.8,300,0,263.9,0,219.6V80.4c0-13.8,3.6-26.9,9.9-38.3C16,31.1,24.6,21.7,35,14.6
C48.3,5.4,64.6,0,82,0h136c45.2,0,82.1,36.1,82.1,80.4v139.2c0,44.3-36.8,80.4-82.1,80.4h-68H82.1L82.1,300z">`;

const useIds: IEyePosObj = {
    "topleft": "iris",
    "topright": "iris",
    "bottomleft": "iris",
};

export const sprites = new IrisSprites(
    `Rounded`,
    definitions,
    useIds
);