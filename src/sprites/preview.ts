import { DotSprites } from "./DotSprites";
import { EyeSprites } from "./EyeSprites";
import { IrisSprites } from "./IrisSprites";

/**
 * 
 * @param sprites 
 * @returns {String}
 *    012345
 *    000000
 * 00 xxx x
 * 10 x  xxx
 * 20 x x x 
 * 30      x
 * 40 xx xx
 * 50  x xx
 */
export function spritePreviewDots(sprites:DotSprites):string{
    // console.log(sprites.displayName);
    return `<svg
    xmlns="http://www.w3.org/2000/svg"
    id="qrdisplaycontainer"
    height="60"
    width="60"
    preserveAspectRatio="xMidYMid meet"
    viewPort="0 0 60 60"
>
    <style>
        .fillblack { fill: black; }
    </style>
    <defs>
        ${sprites.definitions}
    </defs>
    <g>
        ${sprites.use(0,0,`1-rb-`,`fillblack`)}
        ${sprites.use(10,0,`1-r-l`,`fillblack`)}
        ${sprites.use(20,0,`1---l`,`fillblack`)}
        ${sprites.use(40,0,`1--b-`,`fillblack`)}
        
        ${sprites.use(0,10,`1t-b-`,`fillblack`)}
        ${sprites.use(30,10,`1-r--`,`fillblack`)}
        ${sprites.use(40,10,`1trbl`,`fillblack`)}
        ${sprites.use(50,10,`1---l`,`fillblack`)}
        
        ${sprites.use(0,20,`1t---`,`fillblack`)}
        ${sprites.use(20,20,`1----`,`fillblack`)}
        ${sprites.use(40,20,`1t---`,`fillblack`)}
        
        ${sprites.use(50,30,`1----`,`fillblack`)}
        
        ${sprites.use(0,40,`1-r--`,`fillblack`)}
        ${sprites.use(10,40,`1--bl`,`fillblack`)}
        ${sprites.use(30,40,`1-rb-`,`fillblack`)}
        ${sprites.use(40,40,`1--bl`,`fillblack`)}
        
        ${sprites.use(10,50,`1t---`,`fillblack`)}
        ${sprites.use(30,50,`1tr--`,`fillblack`)}
        ${sprites.use(40,50,`1t--l`,`fillblack`)}
    </g>
</svg>`;
}

export function spritePreviewEyes(sprites:EyeSprites):string{
    return `<svg
    xmlns="http://www.w3.org/2000/svg"
    id="qrdisplaycontainer"
    height="60"
    width="60"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 70 70"
>
    <style>
        .fillblack { fill: black; }
    </style>
    <defs>
        ${sprites.definitions}
    </defs>
    <g>
        ${sprites.use(0,0,`topleft`,`fillblack`)}
    </g>
</svg>`;
}

export function spritePreviewIris(sprites:IrisSprites):string{
    return `<svg
    xmlns="http://www.w3.org/2000/svg"
    id="qrdisplaycontainer"
    height="60"
    width="60"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 30 30"
>
    <style>
        .fillblack { fill: black; }
    </style>
    <defs>
        ${sprites.definitions}
    </defs>
    <g>
        ${sprites.use(0,0,`topleft`,`fillblack`)}
    </g>
</svg>`;
}