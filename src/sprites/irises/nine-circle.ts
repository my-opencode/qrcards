import { IrisSprites, IEyePosObj } from "../IrisSprites";

const definitions = `
    <g id="iris">
        <circle  cx="52" cy="52" r="50.5"/>
        <circle  cx="150" cy="52" r="50.5"/>
        <circle  cx="248" cy="52" r="50.5"/>
        <circle  cx="52" cy="248" r="50.5"/>
        <circle  cx="150" cy="248" r="50.5"/>
        <circle  cx="248" cy="248" r="50.5"/>
        <circle  cx="52" cy="150" r="50.5"/>
        <circle  cx="150" cy="150" r="50.5"/>
        <circle  cx="248" cy="150" r="50.5"/>
    </g>`;

const useIds: IEyePosObj = {
    "topleft": "iris",
    "topright": "iris",
    "bottomleft": "iris",
};

export const sprites = new IrisSprites(
    `Nine Circles`,
    definitions,
    useIds
);