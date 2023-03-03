import * as QRCode from "qrcode";
import { applicationData } from "../applicationData";
import { dotsprites, eyesprites, irissprites } from "../sprites/index";
import { IQrSvgOptions } from "../types";
const defaultTextSize = 50;
const defaultTextColor = `#000000`;
type DataArray = (1 | 0)[][];
type Offsetter = (n: number) => number;

export function qrobjToSvg(qrcode: QRCode.QRCode, options?: IQrSvgOptions): { svg: string, height: number, width: number } {
    // known constants
    const dotSize = 10;
    const marginSize = 2 * dotSize;
    // qrcode data & size
    const { dataArr, size, w } = bufferToDataArr(qrcode);
    // height & width
    const width = 2 * marginSize + w * dotSize;
    const height = width + (options?.displayName ? defaultTextSize+20 : 0); // + text height;
    // offsetters
    const x = (coli: number) => marginSize + (coli * dotSize);
    const y = (rowi: number) => marginSize + (rowi * dotSize);
    // open svg
    let svg = `<svg
    xmlns="http://www.w3.org/2000/svg"
    id="qrdisplaycontainer"
    height="${height}"
    width="${width}"
    preserveAspectRatio="xMidYMid meet"
    >
    `;
    // plot
    svg = addStyle(svg);
    svg = addDefs(svg);
    svg = addBg(svg, width, height);
    svg = plotDots(svg, width, height, dataArr, size, w, x, y);
    svg = addLogo(svg, width, height);
    if (options?.displayName) svg = addDisplayName(svg, width, height, options.displayName);
    // close svg
    svg += `
</svg>`;
    // return values
    return { svg, height, width };
}

export function qrobjToSvgHandler(event: Event, data: string, o: QRCode.QRCodeOptions, o2?:IQrSvgOptions): ReturnType<typeof qrobjToSvg> {
    console.log(`create qr code for`, data);
    // QRCode.toFile(`./test.png`, data);
    if (applicationData.style.logo) {
        if (!o) o = {};
        o.errorCorrectionLevel = `Q`;
    }
    const qrobj = QRCode.create(data, o);
    const { svg, height, width } = qrobjToSvg(qrobj,o2);
    return {
        svg,
        height,
        width
    };
}

function DrawADot(x: Offsetter, y: Offsetter, w: number) {
    console.log(`DrawADot: w:`, w);
    const classToUse = (rowi: number, coli: number) => isIrisDot(rowi, coli, w)
        ? `qriris`
        : isEyeDot(rowi, coli, w)
            ? `qreye`
            : `qrdot`;
    return function drawADot(rowi: number, coli: number) {
        return `
  <use x="${x(coli)}" y="${y(rowi)}" href="#dot" class="${classToUse(rowi, coli)}"></use>`;
    };
}

function DrawADotFromSprite(dataArr: DataArray, size: number, x: Offsetter, y: Offsetter, w: number) {
    // console.log(`DrawADotFromSprite: w:`, w, `, size:`, size, `, eye sprites:`,`${applicationData.style.spritesEyes}, eye iris: ${applicationData.style.spritesIrises}`);
    const classToUse = (rowi: number, coli: number) => isIrisDot(rowi, coli, w)
        ? `qriris`
        : isEyeDot(rowi, coli, w)
            ? `qreye`
            : `qrdot`;
    const skip = (rowi: number, coli: number) => (coli < 7 || rowi < 7) && ((
        applicationData.style.spritesEyes !== `default` && isEyeDot(rowi, coli, w)
    ) || (
            applicationData.style.spritesIrises !== `default` && isIrisDot(rowi, coli, w)
        ));
    const sprites = dotsprites.find(([id]) => applicationData.style?.spritesDots === id)?.[1];
    return function drawADotFromSprite(rowi: number, coli: number) {
        if (skip(rowi, coli))
            return ``;
        const spriteId = dotDisplayValue(dataArr, size, rowi, coli);
        return `\n  ` + sprites.use(x(coli), y(rowi), spriteId, classToUse(rowi, coli));
    };
}

function isEyeDot(y: number, x: number, size: number): boolean {
    const max = size - 1;
    // top left eye
    if (x === 0 && y >= 0 && y <= 6)
        return true;
    if (x === 6 && y >= 0 && y <= 6)
        return true;
    if (y === 0 && x > 0 && x < 6)
        return true;
    if (y === 6 && x > 0 && x < 6)
        return true;
    // top right eye
    if (x === max - 6 && y >= 0 && y <= 6)
        return true;
    if (x === max && y >= 0 && y <= 6)
        return true;
    if (y === 0 && x >= max - 6 && x <= max)
        return true;
    if (y === 6 && x >= max - 6 && x <= max)
        return true;
    // bottom left eye
    if (x === 0 && y >= max - 6 && y <= max)
        return true;
    if (x === 6 && y >= max - 6 && y <= max)
        return true;
    if (y === max - 6 && x > 0 && x < 6)
        return true;
    if (y === max && x > 0 && x < 6)
        return true;
}

function isIrisDot(y: number, x: number, size: number): boolean {
    const max = size - 1;
    // top left eye
    if (x === 2 && y >= 2 && y < 5)
        return true;
    if (x === 3 && y >= 2 && y < 5)
        return true;
    if (x === 4 && y >= 2 && y < 5)
        return true;
    // top right eye
    if (x === max - 4 && y >= 2 && y < 5)
        return true;
    if (x === max - 3 && y >= 2 && y < 5)
        return true;
    if (x === max - 2 && y >= 2 && y < 5)
        return true;
    // bottom left eye
    if (x === 2 && y >= max - 4 && y <= max - 2)
        return true;
    if (x === 3 && y >= max - 4 && y <= max - 2)
        return true;
    if (x === 4 && y >= max - 4 && y <= max - 2)
        return true;
}
const logoMaxQrlength = 4;
function addLogo(svg: string, width: number, height: number) {
    if (applicationData.style.logo) {
        const { logoWidth, logoHeight, logo } = applicationData.style;
        const _width = logoWidth > logoHeight ? Math.round(width / logoMaxQrlength) : logoWidth / logoHeight * (Math.round(height / logoMaxQrlength));
        const _height = logoHeight > logoWidth ? Math.round(height / logoMaxQrlength) : logoHeight / logoWidth * (Math.round(width / logoMaxQrlength));
        svg += `
    <g id="logo" class="qrlogo">
        <image x="${Math.round((width - _width) / 2)}" y="${Math.round((height - _height) / 2)}" width="${_width}" height="${_height}" href="${logo}" />
    </g>`;
    }
    return svg;
}
function addBg(svg: string, width: number, height: number) {
    // const bgColor = applicationData.style.colorBg || `white`;
    svg += `
    <g id="bg">
        <rect x="0" y="0" width="${width}" height="${height}" class="qrbg"></rect>
    </g>`;
    return svg;
}
function addDefs(svg: string) {
    const dots = dotsprites.find(([id]) => applicationData.style?.spritesDots === id);
    const eyes = eyesprites.find(([id]) => applicationData.style?.spritesEyes === id);
    const irises = irissprites.find(([id]) => applicationData.style?.spritesIrises === id);
    svg += `
    <defs>
        ${dots?.[1]?.definitions || `<rect id="dot" width="10" height="10"></rect>`}
        ${eyes?.[1]?.definitions || ``}
        ${irises?.[1]?.definitions || ``}
    </defs>`;
    return svg;
}
function dotDisplayValue(dataArr: DataArray, size: number, y: number, x: number) {
    if (!dataArr || !dataArr[y]) return;
    return `` +
        dataArr[y][x] +
        (
            y === 0 ? `-` : dataArr[y - 1][x] ? `t` : `-`
        ) + (
            x === size - 1 ? `-` : dataArr[y][x + 1] ? `r` : `-`
        ) + (
            y === size - 1 ? `-` : dataArr[y + 1][x] ? `b` : `-`
        ) + (
            x === 0 ? `-` : dataArr[y][x - 1] ? `l` : `-`
        );
}
function bufferToDataArr(qrObject: QRCode.QRCode) {
    if (!qrObject) return;
    const size = qrObject.modules.size;
    let data = Array.from(qrObject.modules.data) as (1 | 0)[];
    const w = data.length / size;
    const dataArr: DataArray = [];
    while (data.length) {
        dataArr.push(data.slice(0, w));
        data = data.slice(w);
    }
    return { dataArr, w, size };
}
function addEyeIrisFromSprites(svg: string, x: Offsetter, y: Offsetter, height: number, width: number) {
    // console.log(`called`, applicationData.style.spritesEyes, applicationData.style.spritesIrises);
    const eyePositionNames = [`topleft`, `topright`, `bottomleft`];
    const eyePositions: [number, number][] = [[0, 0], [width - 7, 0], [0, height - 7]].map(c => [x(c[0]), y(c[1])]);
    const irisPositions: [number, number][] = [[2, 2], [width - 5, 2], [2, height - 5]].map(c => [x(c[0]), y(c[1])]);
    if (applicationData.style.spritesIrises && applicationData.style.spritesIrises !== `default`) {
        const s = irissprites.find(es => es[0] === applicationData.style.spritesIrises)?.[1];
        // console.log(applicationData.style.spritesIrises, eyesprites.map(esa => esa[0]).join(``), s);
        if (s)
            eyePositionNames.forEach((p, i) => svg += s.use(...irisPositions[i], p, `qriris`));
    }
    if (applicationData.style.spritesEyes && applicationData.style.spritesEyes !== `default`) {
        const s = eyesprites.find(es => es[0] === applicationData.style.spritesEyes)?.[1];
        if (s)
            eyePositionNames.forEach((p, i) => svg += s.use(...eyePositions[i], p, `qreye`));
    }
    return svg;
}
function addStyle(svg: string) {
    const { colorBg, colorDot, colorEye, colorIris, colorText, textFont, textSize } = applicationData.style;
    svg += `
    <style>
        <![CDATA[
            .qrbg, .qrlogo {
                fill: ${colorBg || `#FFFFFF`};
            }
            .qrdot${!colorEye ? `, .qreye` : ``}${!colorIris && !colorEye ? `, .qriris` : ``} {
                fill: ${colorDot || `#000000`};
            }
            ${!colorEye ? `` : `.qreye${!colorIris ? `, .qriris` : ``}{
                fill: ${colorEye};
            }` }
            ${!colorIris ? `` : `.qriris {
                fill: ${colorIris};
            }` }
            .qrname {
                fill: ${colorText || colorDot || defaultTextColor};
                font: ${textSize || defaultTextSize}px ${textFont || `sans-serif`};
            }
        ]]>
    </style>`;
    return svg;
}
function plotDots(svg: string, width: number, height: number, dataArr: DataArray, size: number, w: number, x: Offsetter, y: Offsetter) {
    svg += `
    <g id="dots">`;
    const spritesOn = applicationData.style.spritesDots || applicationData.style.spritesEyes || applicationData.style.spritesIrises;
    console.log(`Sprites are ${spritesOn ? `on` : `off`}`);
    const drawer = spritesOn
        ? DrawADotFromSprite(dataArr, size, x, y, w)
        : DrawADot(x, y, w);
    for (let rowi = 0; rowi < dataArr.length; rowi++)
        for (let coli = 0; coli < dataArr[rowi].length; coli++)
            if (dataArr[rowi][coli])
                svg += drawer(rowi, coli);

    if (spritesOn)
        svg = addEyeIrisFromSprites(svg, x, y, dataArr.length, dataArr[0].length);
    svg += `
    </g>`;
    return svg;
}

function addDisplayName(svg:string, width:number, height:number, name?: string):string{
    svg += `
    <g id="name">
        <text class="qrname" text-anchor="middle" x="${Math.round(width/2)}" y="${height-20}">${name || "Qr Name Card"}</text>
    </g>`;
    return svg;
}