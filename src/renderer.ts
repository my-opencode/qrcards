const qrdisplaycontainer = document.getElementById(`qrdisplaycontainer`) as unknown as SVGAElement;
const qrgenbtn = document.getElementById('qrgenbtn');
const qrdldbtn = document.getElementById('qrdldbtn');
const qrlink = document.getElementById('qrdldlink') as HTMLAnchorElement;
const qrdisplay = document.getElementById(`qrdisplay`);
const qrdata = document.getElementById(`qrdata`) as HTMLInputElement;
async function generateAndDisplayQr() {
    if (!qrdata?.value)
        return;
    qrdisplay.innerHTML = ``;
    const { svg, width, height } = await window.qrapi.qrcodesvg(qrdata.value);
    // console.log(`qrcodesvg returned ${width} & ${height}`);
    qrdisplaycontainer.setAttribute(`viewBox`, `0 0 ${width} ${height}`);
    qrdisplay.innerHTML = svg;
    // setDownloadButtonBlob();
    qrdldbtn.removeAttribute(`disabled`);
}
qrgenbtn.addEventListener(`click`, generateAndDisplayQr);
function setDownloadButtonBlob() {
    console.log(`set dl`);
    // <canvas id="myCanvas" width="300" height="300"></canvas>
    // get svg blob
    const { width, height } = qrdisplaycontainer.getBBox();
    const clonedSvg = qrdisplaycontainer.cloneNode(true) as SVGAElement;
    const svgBlob = new Blob([clonedSvg.outerHTML], { type: 'image/svg+xml' });
    console.log(`svg blob ok`);
    // svg blob to canvas blob url
    const DOMURL = window.URL || window.webkitURL; // || window;
    const svgBlobUrl = DOMURL.createObjectURL(svgBlob);
    console.log(`svg blob url ok`);
    // create & load image
    const img = new Image();
    return new Promise(r => {
        img.onload = function () {
            console.log(`image loaded`);
            // draw on canvas
            const canvas = document.createElement(`canvas`);
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            console.log(`canvas drawn`);
            // canvas data url as download link
            const pngDataUrl = canvas.toDataURL();
            qrlink.download = `qrcode.png`;
            qrlink.href = pngDataUrl;
            console.log(`link set`);
            DOMURL.revokeObjectURL(svgBlobUrl);
            r(1);
        };
        // init image
        img.src = svgBlobUrl;
    });
}
qrdldbtn.addEventListener(`click`, downloadQr);
async function downloadQr() {
    console.log(`dowload clicked`);
    await setDownloadButtonBlob();
    qrlink.click();
}