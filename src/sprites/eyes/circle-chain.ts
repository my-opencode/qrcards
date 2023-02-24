import { EyeSprites, IEyePosObj } from "../EyeSprites";

const path = `M693.3,150.6c0-22.8-14.6-42.1-35-49.1c20.4-7,35-26.3,35-49.1c0-28.7-23.3-52-52-52
    c-22.8,0-42,14.6-49.1,35c-7-20.4-26.3-35-49.1-35S501,15.1,494,35.4c-7-20.4-26.3-35-49.1-35c-22.8,0-42,14.6-49.1,35
    c-7-20.4-26.3-35-49.1-35s-42.1,14.6-49.1,35c-7-20.4-26.3-35-49.1-35s-42,14.6-49.1,35c-7-20.4-26.3-35-49.1-35
    s-42.1,14.7-49.1,35c-7-20.4-26.3-35-49.1-35c-28.7,0-52,23.3-52,52c0,22.8,14.7,42,35,49.1c-20.4,7-35,26.3-35,49.1
    s14.6,42,35,49.1c-20.4,7-35,26.3-35,49.1s14.6,42,35,49.1c-20.4,7-35,26.3-35,49.1s14.6,42.1,35,49.1c-20.4,7.1-35,26.3-35,49.1
    s14.7,42.1,35,49.1c-20.4,7-35,26.3-35,49.1s14.6,42,35,49.1c-20.4,7.1-35,26.3-35,49.1c0,28.7,23.3,52,52,52
    c3.6,0,7.1-0.4,10.5-1.1c18.1-3.7,32.7-16.8,38.6-33.9c7,20.4,26.3,35,49.1,35s42-14.6,49.1-35c7,20.4,26.3,35,49.1,35
    s42-14.6,49.1-35c7,20.4,26.3,35,49.1,35s42.1-14.6,49.1-35c7,20.4,26.3,35,49.1,35c22.8,0,42.1-14.7,49.1-35
    c7,20.4,26.3,35,49.1,35s42-14.6,49.1-35c7,20.4,26.3,35,49.1,35c28.7,0,52-23.3,52-52c0-22.8-14.6-42-35-49.1
    c20.4-7,35-26.3,35-49.1s-14.6-42.1-35-49.1c20.4-7,35-26.3,35-49.1c0-22.8-14.6-42-35-49.1c20.4-7,35-26.3,35-49.1
    c0-22.8-14.6-42.1-35-49.1c20.4-7.1,35-26.3,35-49.1s-14.6-42-35-49.1C678.7,192.6,693.3,173.3,693.3,150.6z M624.4,592.4
    c-15,5.2-26.9,17.1-32.1,32.1c-7-20.4-26.3-35-49.1-35s-42.1,14.6-49.1,35c-7-20.4-26.3-35-49.1-35c-22.8,0-42,14.6-49.1,35
    c-7-20.4-26.3-35-49.1-35s-42.1,14.6-49.1,35c-7-20.4-26.3-35-49.1-35s-42,14.6-49.1,35c-7-20.4-26.3-35-49.1-35
    s-42.1,14.6-49.1,35c-5.2-15-17.1-26.9-32.1-32.1c20.4-7,35-26.3,35-49.1s-14.7-42.1-35-49.1c20.4-7,35-26.3,35-49.1
    c0-22.8-14.7-42-35-49.1c20.4-7,35-26.3,35-49.1c0-22.8-14.6-42.1-35-49.1c20.4-7.1,35-26.3,35-49.1s-14.6-42-35-49.1
    c20.4-7,35-26.3,35-49.1s-14.7-42.1-35-49.1c15-5.2,26.9-17.1,32.1-32.1c7,20.4,26.3,35,49.1,35s42-14.6,49.1-35
    c7,20.4,26.3,35,49.1,35s42-14.6,49.1-35c7,20.4,26.3,35,49.1,35s42.1-14.6,49.1-35c7,20.4,26.3,35,49.1,35
    c22.8,0,42.1-14.7,49.1-35c7,20.4,26.3,35,49.1,35s42-14.6,49.1-35c5.2,15,17.1,26.9,32.1,32.1c-20.4,7-35,26.3-35,49.1
    s14.6,42,35,49.1c-20.4,7-35,26.3-35,49.1s14.6,42,35,49.1c-20.4,7-35,26.3-35,49.1s14.6,42.1,35,49.1c-20.4,7.1-35,26.3-35,49.1
    s14.6,42.1,35,49.1c-20.4,7-35,26.3-35,49.1C589.4,566.1,604,585.4,624.4,592.4z`;
const definitions = `<path id="eye" x="0" y="0" d="${path}"/>`;
const useIds: IEyePosObj = {
    bottomleft: `eye`,
    topleft: `eye`,
    topright: `eye`
};
export const sprites = new EyeSprites(
    `Circle Chain 2`,
    definitions,
    useIds
);