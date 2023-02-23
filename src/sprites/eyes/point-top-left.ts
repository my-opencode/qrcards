import { EyeSprites, IEyePosObj } from "../EyeSprites";

const definitions = `
    <path id="eye-bl" x="0" y="0" d="M0,236.6V464c0,130.3,107.1,236.3,238.9,236.3h222c131.7,0,238.9-106,238.9-236.3V0H238.6
        C107.1,0,0,106,0,236.6z M105.1,236.6c0-72.3,60-131.4,134-131.4h356V464c0,72.3-60,131.1-134,131.1h-222
        c-74,0-134-58.9-134-131.1L105.1,236.6L105.1,236.6z"/>
    <path id="eye-tr" d="M699.7,463.7V236.3C699.7,106,592.6,0,460.9,0h-222C107.1,0,0,106,0,236.3v464h461.1
        C592.6,700.3,699.7,594.3,699.7,463.7z M594.9,463.7c0,72.3-60,131.4-134,131.4h-356V236.6c0-72.3,60-131.1,134-131.1h222
        c74,0,134,58.9,134,131.1V463.7z"/>
    <path id="eye-tl" d="M0,463.7V236.3C0,106,107.1,0,238.9,0h222c131.7,0,238.9,106,238.9,236.3v464H238.6
        C107.1,700.3,0,594.3,0,463.7z M105.1,463.7c0,72.3,60,131.4,134,131.4h356V236.6c0-72.3-60-131.1-134-131.1h-222
        c-74,0-134,58.9-134,131.1L105.1,463.7L105.1,463.7z"/>
        `;
const useIds: IEyePosObj = {
    topleft: `eye-tl`,
    topright: `eye-tr`,
    bottomleft: `eye-bl`
};
export const sprites = new EyeSprites(
    `Point Top Left`,
    definitions,
    useIds
);