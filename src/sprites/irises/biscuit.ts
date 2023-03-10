import { IrisSprites, IEyePosObj } from "../IrisSprites";

const path = `M283.3,278.7 294.1,259.9 283.3,241.1 294.1,222.3 283.3,203.5 294.1,184.7 283.3,165.9 
    294.1,147.1 283.3,128.3 294.1,109.4 283.3,90.6 294.1,71.8 283.3,53 294.1,34.2 283.3,15.4 289.4,4.7 278.7,10.9 259.9,0 
    241.1,10.9 222.3,0 203.5,10.9 184.7,0 165.9,10.9 147.1,0 128.3,10.9 109.4,0 90.6,10.9 71.8,0 53,10.9 34.2,0 15.4,10.9 4.7,4.7 
    10.9,15.4 0,34.2 10.9,53 0,71.8 10.9,90.6 0,109.4 10.9,128.3 0,147.1 10.9,165.9 0,184.7 10.9,203.5 0,222.3 10.9,241.1 0,259.9 
    10.9,278.7 4.7,289.4 15.4,283.3 34.2,294.1 53,283.3 71.8,294.1 90.6,283.3 109.4,294.1 128.3,283.3 147.1,294.1 165.9,283.3 
    184.7,294.1 203.5,283.3 222.3,294.1 241.1,283.3 259.9,294.1 278.7,283.3 289.4,289.4z`;

const definitions = `<path id="iris" x="0" y="0" d="${path}">`;

const useIds: IEyePosObj = {
    "topleft": "iris",
    "topright": "iris",
    "bottomleft": "iris",
};

export const sprites = new IrisSprites(
    `Biscuit`,
    definitions,
    useIds
);