import { QRCode } from "qrcode";

export function qrobjToSvg(qrcode: QRCode): { svg: string, height: number, width: number } {
    // known constants
    const dotSize = 10;
    const marginSize = 2 * dotSize;
    const bgColor = `white`;
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
    let svg = `<rect x="0" y="0" width="${width}" height="${height}" fill="${bgColor}" />`;
    let rowi = 0;
    while (data.length) {
        let coli = 0;
        const row = data.slice(0, w);
        data = data.slice(w);
        for (const v of row) {
            if (v)
                svg += `<use x="${x(coli)}" y="${y(rowi)}" href="#dot" />`;
            coli++;
        }
        rowi++;
    }
    // return values
    console.log({ svg, height, width });
    return { svg, height, width };
}