import QRCode from "qrcode";
import { applicationData } from "../applicationData";
import { dotsprites, eyesprites, irissprites } from "../sprites/index";
type DataArray = (1 | 0 | true | false)[][];

export function qrobjToSvg(qrcode: QRCode.QRCode): { svg: string, height: number, width: number } {
    // known constants
    const dotSize = 10;
    const marginSize = 2 * dotSize;
    const spritesOn = applicationData.style.spritesDots || applicationData.style.spritesEyes || applicationData.style.spritesIrises;
    // qrcode data & size
    const { dataArr, size } = bufferToDataArr(qrcode);
    let data = [...qrcode.modules.data];
    const w = data.length / size;
    // height & width
    const width = 2 * marginSize + w * dotSize;
    const height = width; // + text height;
    // offsetters
    const x = (coli: number) => marginSize + (coli * dotSize);
    const y = (rowi: number) => marginSize + (rowi * dotSize);
    // build svg html
    // bg
    let svg = `<svg
    xmlns="http://www.w3.org/2000/svg"
    id="qrdisplaycontainer"
    height="${height}"
    width="${width}"
    preserveAspectRatio="xMidYMid meet"
    >
    `;
    svg = addDefs(svg);
    svg = addBg(svg, width, height);
    // dots
    let rowi = 0;
    const drawer = spritesOn
        ? DrawADot(x, y, w)
        : DrawADotFromSprite(dataArr, size, x, y, w);
    while (data.length) {
        let coli = 0;
        const row = data.slice(0, w);
        data = data.slice(w);
        for (const v of row) {
            if (v)
                svg += drawer(coli, rowi);
            coli++;
        }
        rowi++;
    }
    if (spritesOn)
        svg = addEyeIrisFromSprites(svg, width, height);
    svg = addLogo(svg, width, height);
    // close svg
    svg += `
</svg>`;
    // return values
    return { svg, height, width };
}

export function qrobjToSvgHandler(event: Event, data: string, o: QRCode.QRCodeOptions): ReturnType<typeof qrobjToSvg> {
    console.log(`create qr code for`, data);
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

function DrawADot(x: (n: number) => number, y: (n: number) => number, w: number) {
    console.log(`DrawADot: w:`, w);
    const { colorDot, colorEye, colorIris } = applicationData.style;
    const color = (coli: number, rowi: number) => colorIris && isIrisDot(coli, rowi, w)
        ? colorIris
        : colorEye && isEyeDot(coli, rowi, w)
            ? colorEye
            : colorDot;
    return function drawADot(coli: number, rowi: number) {
        const c = color(coli, rowi) || `black`;
        return `<use x="${x(coli)}" y="${y(rowi)}" href="#dot" fill="${c}"></use>`;
    };
}

function DrawADotFromSprite(dataArr: DataArray, size: number, x: (n: number) => number, y: (n: number) => number, w: number) {
    console.log(`DrawADot: w:`, w);
    const { colorDot, colorEye, colorIris } = applicationData.style;
    const color = (coli: number, rowi: number) => colorIris && isIrisDot(coli, rowi, w)
        ? colorIris
        : colorEye && isEyeDot(coli, rowi, w)
            ? colorEye
            : colorDot;
    const skip = (coli: number, rowi: number) => (applicationData.style.spritesEyes && isEyeDot(coli, rowi, w)) || (applicationData.style.spritesIrises && isIrisDot(coli, rowi, w));
    return function drawADot(coli: number, rowi: number) {
        if (skip(coli, rowi))
            return ``;
        const c = color(coli, rowi) || `black`;
        const sprite = dotDisplayValue(dataArr, size, coli, rowi);
        return `<use x="${x(coli)}" y="${y(rowi)}" href="#${sprite}" fill="${c}"></use>`;
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
    <g id="logo">
        <image x="${Math.round((width - _width) / 2)}" y="${Math.round((height - _height) / 2)}" width="${_width}" height="${_height}" href="${logo}" />
    </g>`;
    }
    return svg;
}
function addBg(svg: string, width: number, height: number) {
    const bgColor = applicationData.style.colorBg || `white`;
    svg += `
    <g id="bg">
        <rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}"></rect>
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
            rowi === this.size - 1 ? `-` : dataArr[coli][rowi + 1] ? `r` : `-`
        ) + (
            coli === this.size - 1 ? `-` : dataArr[coli + 1][rowi] ? `b` : `-`
        ) + (
            rowi === 0 ? `-` : dataArr[coli][rowi - 1] ? `l` : `-`
        );
}
function bufferToDataArr(qrObject: QRCode.QRCode) {
    if (!qrObject) return;
    const bufferData = [...qrObject.modules.data];
    const size = qrObject.modules.size;
    const dataArr = [];
    for (let i = 0; i < size; i++) {
        dataArr.push(bufferData.slice(i * size, (i + 1) * size));
    }
    return { dataArr, size };
}
function addEyeIrisFromSprites(svg: string, width: number, height: number){
    // to do
    return svg;
}