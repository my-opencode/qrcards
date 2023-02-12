import { EyeSprites } from "../EyeSprites";

const definitions = `<path id="eye" x="0" y="0" d="M461,0H239l0,0C130.8,0,39.1,71.5,9.8,169.2c-3,10.1-5.4,20.5-7,31.1C0.9,212,0,224,0,236.2
    v227.3c0,130.3,107.2,236.3,239,236.3h111h111c131.7,0,239-106,239-236.3V236.2C700,106,592.8,0,461,0z M595,463.5
    c0,72.4-60.1,131.3-134,131.3H350H239c-73.9,0-134-58.9-134-131.3V236.2c0-22.6,5.9-43.9,16.2-62.5c9.9-17.9,24-33.3,40.9-44.9
    c21.8-15,48.3-23.8,76.9-23.8h222c73.9,0,134,58.9,134,131.2V463.5z">`;

const useIds = {
    "topleft": "eye",
    "topright": "eye",
    "bottomleft": "eye",
};

export const sprites = new EyeSprites(
    `Rounded`,
    definitions,
    useIds
);

// <use xlink:href="#eye-rounded" x="0" y="0" class="${classes || `eye0`}" />
// <use xlink:href="#eye-rounded" x="${width - (7*step)}" y="0" class="${classes || `eye0`}" />
// <use xlink:href="#eye-rounded" x="0" y="${width - (7*step)}" class="${classes || `eye0`}" />
