import { EyeSprites, IEyePosObj } from "../EyeSprites";

const definitions = `
    <path id="eye-tl" x="0" y="0" c d="M700.3,0.4v239v222c0,59.4,0,239,0,239s-164.8,0-236.2,0H0.3l0.1-461c0-131.7,106-239,236.3-239
    H464L700.3,0.4L700.3,0.4z M595.3,105.4H236.7c-72.4,0-131.3,60.1-131.3,134l-0.1,356h490V105.4z"/>
    <path id="eye-tr" c d="M0,0.4v239v222c0,59.4,0,239,0,239s164.8,0,236.2,0H700l-0.1-461c0-131.7-106-239-236.3-239H236.2
    L0,0.4L0,0.4z M105,105.4h358.5c72.4,0,131.3,60.1,131.3,134l0.1,356H105V105.4z"/>
    <path id="eye-bl" c d="M700.3,700.1v-239V239c0-59.4,0-239,0-239S535.5,0,464.1,0H0.3l0.1,461c0,131.7,106,239,236.3,239
    H464L700.3,700.1L700.3,700.1z M595.3,595.1H236.7c-72.4,0-131.3-60.1-131.3-134l-0.1-356h490V595.1z"/>
        `;

const useIds: IEyePosObj = {
    topleft: `eye-tl`,
    topright: `eye-tr`,
    bottomleft: `eye-bl`
};

export const sprites = new EyeSprites(
    `Style 6`,
    definitions,
    useIds
);