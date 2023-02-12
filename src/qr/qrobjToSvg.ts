import QRCode from "qrcode";
import { applicationData } from "../applicationData";

export function qrobjToSvg(qrcode: QRCode.QRCode): { svg: string, height: number, width: number } {
    // known constants
    const dotSize = 10;
    const marginSize = 2 * dotSize;
    const bgColor = applicationData.style.colorBg || `white`;
    // qrcode data & size
    let data = [...qrcode.modules.data];
    const w = data.length / qrcode.modules.size;
    // height & width
    const width = 2 * marginSize + w * dotSize;
    const height = width; // + text height;
    // offsetters
    const x = (coli: number) => marginSize + (coli * dotSize);
    const y = (rowi: number) => marginSize + (rowi * dotSize);
    // build svg html
    // bg
    let svg = `<rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}"></rect>`;
    // dots
    let rowi = 0;
    const drawer = DrawADot(x, y, w);
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
    svg = addLogo(svg,width,height);
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
function addLogo (svg:string,width:number,height:number){
    if (applicationData.style.logo) {
        const {logoWidth,logoHeight,logo} = applicationData.style;
        const _width = logoWidth > logoHeight ? Math.round(width / logoMaxQrlength) : logoWidth/logoHeight*(Math.round(height / logoMaxQrlength));
        const _height = logoHeight > logoWidth ? Math.round(height / logoMaxQrlength) : logoHeight/logoWidth*(Math.round(width / logoMaxQrlength));
        svg +=`<g>
        <image x="${Math.round((width - _width) / 2)}" y="${Math.round((height - _height) / 2)}" width="${_width}" height="${_height}" href="${logo}" />
    </g>`;
    }
    return svg;
}