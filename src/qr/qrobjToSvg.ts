import * as QRCode from "qrcode";
import { applicationData } from "../applicationData";
import { dotsprites, eyesprites, irissprites } from "../sprites/index";
type DataArray = (1 | 0)[][];
type Offsetter = (n: number) => number;

export function qrobjToSvg(qrcode: QRCode.QRCode): { svg: string, height: number, width: number } {
    // known constants
    const dotSize = 10;
    const marginSize = 2 * dotSize;
    // qrcode data & size
    const { dataArr, size, w } = bufferToDataArr(qrcode);
    // height & width
    const width = 2 * marginSize + w * dotSize;
    const height = width; // + text height;
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
    // close svg
    svg += `
</svg>`;
    // return values
    return { svg, height, width };
}

export function qrobjToSvgHandler(event: Event, data: string, o: QRCode.QRCodeOptions): ReturnType<typeof qrobjToSvg> {
    console.log(`create qr code for`, data);
    QRCode.toFile(`./test.png`,data);
    if (applicationData.style.logo) {
        if (!o) o = {};
        o.errorCorrectionLevel = `Q`;
    }
    const qrobj = QRCode.create(data, o);
    const { svg, height, width } = qrobjToSvg(qrobj);
    return {
        svg,
        height,
        width
    };
}

function DrawADot(x: Offsetter, y: Offsetter, w: number) {
    console.log(`DrawADot: w:`, w);
    const classToUse = (coli: number, rowi: number) => isIrisDot(coli, rowi, w)
        ? `qriris`
        : isEyeDot(coli, rowi, w)
            ? `qreye`
            : `qrdot`;
    return function drawADot(coli: number, rowi: number) {
        return `
  <use x="${x(coli)}" y="${y(rowi)}" href="#dot" class="${classToUse(coli, rowi)}"></use>`;
    };
}

function DrawADotFromSprite(dataArr: DataArray, size: number, x: Offsetter, y: Offsetter, w: number) {
    console.log(`DrawADotFromSprite: w:`, w, `size:`, size);
    const classToUse = (coli: number, rowi: number) => isIrisDot(coli, rowi, w)
        ? `qriris`
        : isEyeDot(coli, rowi, w)
            ? `qreye`
            : `qrdot`;
    const skip = (coli: number, rowi: number) => (coli<7 && rowi<7) &&( (
        applicationData.style.spritesEyes !== `default` && isEyeDot(coli, rowi, w)
    ) || (
        applicationData.style.spritesIrises !== `default` && isIrisDot(coli, rowi, w)
    ));
    const sprites = dotsprites.find(([id]) => applicationData.style?.spritesDots === id)?.[1];
    return function drawADotFromSprite(coli: number, rowi: number) {
        if (skip(coli, rowi))
            return ``;
        const spriteId = dotDisplayValue(dataArr, size, coli, rowi);
        return `\n  ` + sprites.use(spriteId, x(rowi), y(coli), classToUse(coli, rowi));
    };
}

function isEyeDot(coli: number, rowi: number, size: number): boolean {
    const max = size - 1;
    // top left eye
    if (coli === 0 && rowi >= 0 && rowi <= 6)
        return true;
    if (coli === 6 && rowi >= 0 && rowi <= 6)
        return true;
    if (rowi === 0 && coli > 0 && coli < 6)
        return true;
    if (rowi === 6 && coli > 0 && coli < 6)
        return true;
    // top right eye
    if (coli === max - 6 && rowi >= 0 && rowi <= 6)
        return true;
    if (coli === max && rowi >= 0 && rowi <= 6)
        return true;
    if (rowi === 0 && coli >= max - 6 && coli <= max)
        return true;
    if (rowi === 6 && coli >= max - 6 && coli <= max)
        return true;
    // bottom left eye
    if (coli === 0 && rowi >= max - 6 && rowi <= max)
        return true;
    if (coli === 6 && rowi >= max - 6 && rowi <= max)
        return true;
    if (rowi === max - 6 && coli > 0 && coli < 6)
        return true;
    if (rowi === max && coli > 0 && coli < 6)
        return true;
}

function isIrisDot(coli: number, rowi: number, size: number): boolean {
    const max = size - 1;
    // top left eye
    if (coli === 2 && rowi >= 2 && rowi <= 4)
        return true;
    if (coli === 3 && rowi >= 2 && rowi <= 4)
        return true;
    if (coli === 4 && rowi >= 2 && rowi <= 4)
        return true;
    // top right eye
    if (coli === max - 4 && rowi >= 2 && rowi <= 4)
        return true;
    if (coli === max - 3 && rowi >= 2 && rowi <= 4)
        return true;
    if (coli === max - 2 && rowi >= 2 && rowi <= 4)
        return true;
    // bottom left eye
    if (coli === 2 && rowi >= max - 4 && rowi <= max - 2)
        return true;
    if (coli === 3 && rowi >= max - 4 && rowi <= max - 2)
        return true;
    if (coli === 4 && rowi >= max - 4 && rowi <= max - 2)
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
function dotDisplayValue(dataArr: DataArray, size: number, coli: number, rowi: number) {
    if (!dataArr || !dataArr[coli]) return;
    return `` +
        dataArr[coli][rowi] +
        (
            coli === 0 ? `-` : dataArr[coli - 1][rowi] ? `t` : `-`
        ) + (
            rowi === size - 1 ? `-` : dataArr[coli][rowi + 1] ? `r` : `-`
        ) + (
            coli === size - 1 ? `-` : dataArr[coli + 1][rowi] ? `b` : `-`
        ) + (
            rowi === 0 ? `-` : dataArr[coli][rowi - 1] ? `l` : `-`
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
function addEyeIrisFromSprites(svg: string, width: number, height: number) {
    // to do
    return svg;
}
function addStyle(svg: string) {
    const { colorBg, colorDot, colorEye, colorIris } = applicationData.style;
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
            .qrtext {
                color: ${colorDot || `#000000`};
            }
        ]]>
    </style>`;
    return svg;
}
function plotDots(svg: string, width: number, height: number, dataArr: DataArray, size: number, w: number, x: Offsetter, y: Offsetter) {
    svg += `
    <g id="dots">`;
    let rowi = 0;
    const spritesOn = applicationData.style.spritesDots || applicationData.style.spritesEyes || applicationData.style.spritesIrises;
    console.log(`Sprites are ${spritesOn ? `on` : `off`}`);
    const drawer = spritesOn
        ? DrawADotFromSprite(dataArr, size, x, y, w)
        : DrawADot(x, y, w);
    for (const row of dataArr) {
        let coli = 0;
        for (const v of row) {
            if (v)
                svg += drawer(coli, rowi);
            coli++;
        }
        rowi++;
    }
    if (spritesOn)
        svg = addEyeIrisFromSprites(svg, width, height);
    svg += `
    </g>`;
    return svg;
}