import { EyeSprites, IEyePosObj } from "../EyeSprites";


const definitions = `
    <path id="eye-tl" x="0" y="0" d="M464,700.4H236.7c-130.3,0-236.3-107.2-236.3-239L0.3,0.4H464c130.3,0,236.2,107.2,236.2,239v222
    v239H464z M595.3,239.4c0-73.9-58.9-134-131.2-134H105.3l0.1,356c0,73.9,58.9,134,131.3,134h358.5L595.3,239.4L595.3,239.4z"/>
    <path id="eye-bl" d="M463.7,0.4H236.5C106.1,0.4,0.1,107.7,0.1,239.4L0,700.4h463.7c130.3,0,236.2-107.2,236.2-239
    v-222V0.4H463.7z M595,461.4c0,73.9-58.9,134-131.2,134H105l0.1-356c0-73.9,58.9-134,131.3-134H595V461.4z"/>
    <path id="eye-tr" d="M463.7,0.4H236.5C106.1,0.4,0.1,107.7,0.1,239.4L0,700.4h463.7c130.3,0,236.2-107.2,236.2-239
    v-222V0.4H463.7z M595,461.4c0,73.9-58.9,134-131.2,134H105l0.1-356c0-73.9,58.9-134,131.3-134H595V461.4z"/>
        `;

const useIds: IEyePosObj = {
    topleft: `eye-tl`,
    topright: `eye-tr`,
    bottomleft: `eye-bl`
};

export const sprites = new EyeSprites(
    `Pointy toward center`,
    definitions,
    useIds
);