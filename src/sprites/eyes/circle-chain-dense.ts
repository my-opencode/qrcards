import { EyeSprites, IEyePosObj } from "../EyeSprites";

const path = `M678.5,87.7c7.2-8.8,11.5-20.1,11.5-32.4c0-26.7-20.3-48.6-46.2-51.2
    c-1.7-0.2-3.5-0.3-5.3-0.3s-3.5,0.1-5.3,0.3c-10.2,1-19.6,5.1-27.1,11.2C597.2,8.2,586,3.9,573.7,3.9s-23.6,4.3-32.4,11.5
    c-8.9-7.2-20.1-11.5-32.4-11.5c-12.3,0-23.6,4.3-32.4,11.5c-8.8-7.2-20.1-11.5-32.4-11.5s-23.6,4.3-32.4,11.5
    c-8.8-7.2-20.1-11.5-32.4-11.5s-23.6,4.3-32.4,11.5C338,8.2,326.7,3.9,314.4,3.9c-12.3,0-23.6,4.3-32.4,11.5
    c-8.8-7.2-20.1-11.5-32.4-11.5S226,8.2,217.2,15.4c-8.8-7.2-20.1-11.5-32.4-11.5s-23.6,4.3-32.4,11.5C143.5,8.2,132.3,3.9,120,3.9
    S96.4,8.2,87.6,15.4C80,9.2,70.7,5.2,60.4,4.1c-1.7-0.2-3.5-0.3-5.3-0.3s-3.5,0.1-5.3,0.3C23.9,6.8,3.7,28.7,3.7,55.3
    c0,12.3,4.3,23.6,11.5,32.4C8,96.6,3.7,107.8,3.7,120.1s4.3,23.6,11.5,32.4C8,161.4,3.7,172.7,3.7,185s4.3,23.6,11.5,32.4
    C8,226.2,3.7,237.5,3.7,249.8s4.3,23.6,11.5,32.4C8,291,3.7,302.3,3.7,314.6c0,12.3,4.3,23.6,11.5,32.4
    C8,355.8,3.7,367.1,3.7,379.4S8,403,15.2,411.8C8,420.7,3.7,431.9,3.7,444.2c0,12.3,4.3,23.6,11.5,32.4C8,485.5,3.7,496.7,3.7,509
    s4.3,23.6,11.5,32.4C8,550.3,3.7,561.6,3.7,573.8c0,12.3,4.3,23.6,11.5,32.4C8,615.1,3.7,626.4,3.7,638.7c0,28.4,23,51.5,51.5,51.5
    c12.3,0,23.6-4.3,32.4-11.5c8.9,7.2,20.1,11.5,32.4,11.5s23.6-4.3,32.4-11.5c8.9,7.2,20.1,11.5,32.4,11.5s23.6-4.3,32.4-11.5
    c8.8,7.2,20.1,11.5,32.4,11.5s23.6-4.3,32.4-11.5c8.9,7.2,20.1,11.5,32.4,11.5s23.6-4.3,32.4-11.5c8.9,7.2,20.1,11.5,32.4,11.5
    s23.6-4.3,32.4-11.5c8.8,7.2,20.1,11.5,32.4,11.5s23.6-4.3,32.4-11.5c8.8,7.2,20.1,11.5,32.4,11.5c12.3,0,23.6-4.3,32.4-11.5
    c8.8,7.2,20.1,11.5,32.4,11.5c12.3,0,23.6-4.3,32.4-11.5c8.8,7.2,20.1,11.5,32.4,11.5c28.4,0,51.5-23,51.5-51.5
    c0-12.3-4.3-23.6-11.5-32.4c7.2-8.8,11.5-20.1,11.5-32.4c0-12.3-4.3-23.6-11.5-32.4c7.2-8.8,11.5-20.1,11.5-32.4
    c0-12.3-4.3-23.6-11.5-32.4c7.2-8.8,11.5-20.1,11.5-32.4s-4.3-23.6-11.5-32.4c7.2-8.8,11.5-20.1,11.5-32.4s-4.3-23.6-11.5-32.4
    c7.2-8.9,11.5-20.1,11.5-32.4s-4.3-23.6-11.5-32.4c7.2-8.9,11.5-20.1,11.5-32.4s-4.3-23.6-11.5-32.4c7.2-8.9,11.5-20.1,11.5-32.4
    c0-12.3-4.3-23.6-11.5-32.4c7.2-8.9,11.5-20.1,11.5-32.4C690,107.8,685.6,96.6,678.5,87.7z M598.5,217.4
    c-7.2,8.8-11.5,20.1-11.5,32.4s4.3,23.6,11.5,32.4c-7.2,8.9-11.5,20.1-11.5,32.4s4.3,23.6,11.5,32.4c-7.2,8.9-11.5,20.1-11.5,32.4
    s4.3,23.6,11.5,32.4c-7.2,8.8-11.5,20.1-11.5,32.4s4.3,23.6,11.5,32.4c-7.2,8.9-11.5,20.1-11.5,32.4s4.3,23.6,11.5,32.4
    c-7.2,8.8-11.5,20.1-11.5,32.4c0,5.5,0.9,10.9,2.5,15.9c-5-1.6-10.3-2.5-15.9-2.5c-12.3,0-23.6,4.3-32.4,11.5
    c-8.9-7.2-20.1-11.5-32.4-11.5s-23.6,4.3-32.4,11.5c-8.8-7.2-20.1-11.5-32.4-11.5s-23.6,4.3-32.4,11.5
    c-8.8-7.2-20.1-11.5-32.4-11.5s-23.6,4.3-32.4,11.5c-8.9-7.2-20.1-11.5-32.4-11.5s-23.6,4.3-32.4,11.5
    c-8.8-7.2-20.1-11.5-32.4-11.5s-23.6,4.3-32.4,11.5c-8.8-7.2-20.1-11.5-32.4-11.5s-23.6,4.3-32.4,11.5
    c-8.8-7.2-20.1-11.5-32.4-11.5c-5.5,0-10.9,0.9-15.9,2.5c1.6-5,2.5-10.3,2.5-15.9c0-12.3-4.3-23.6-11.5-32.4
    c7.2-8.8,11.5-20.1,11.5-32.4c0-12.3-4.3-23.6-11.5-32.4c7.2-8.8,11.5-20.1,11.5-32.4s-4.3-23.6-11.5-32.4
    c7.2-8.8,11.5-20.1,11.5-32.4s-4.3-23.6-11.5-32.4c7.2-8.9,11.5-20.1,11.5-32.4s-4.3-23.6-11.5-32.4c7.2-8.8,11.5-20.1,11.5-32.4
    c0-12.3-4.3-23.6-11.5-32.4c7.2-8.8,11.5-20.1,11.5-32.4s-4.3-23.6-11.5-32.4c7.2-8.8,11.5-20.1,11.5-32.4c0-5.5-0.9-10.9-2.5-15.9
    c5,1.6,10.3,2.5,15.9,2.5c12.3,0,23.6-4.3,32.4-11.5c8.9,7.2,20.1,11.5,32.4,11.5c12.3,0,23.6-4.3,32.4-11.5
    c8.8,7.2,20.1,11.5,32.4,11.5s23.6-4.3,32.4-11.5c8.9,7.2,20.1,11.5,32.4,11.5s23.6-4.3,32.4-11.5c8.9,7.2,20.1,11.5,32.4,11.5
    s23.6-4.3,32.4-11.5c8.8,7.2,20.1,11.5,32.4,11.5s23.6-4.3,32.4-11.5c8.9,7.2,20.1,11.5,32.4,11.5c12.3,0,23.6-4.3,32.4-11.5
    c8.8,7.2,20.1,11.5,32.4,11.5c5.5,0,10.9-0.9,15.9-2.5c-1.6,5-2.5,10.3-2.5,15.9c0,12.3,4.3,23.6,11.5,32.4
    c-7.2,8.9-11.5,20.1-11.5,32.4C587,197.2,591.3,208.5,598.5,217.4z`;

const definitions = `<path id="eye" x="0" y="0" d="${path}"/>`;

const useIds: IEyePosObj = {
    topleft: `eye`,
    topright: `eye`,
    bottomleft: `eye`,
};

export const sprites = new EyeSprites(
    `Dense Circle Chain`,
    definitions,
    useIds
);