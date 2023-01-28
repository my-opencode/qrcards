const pageContentDiv = document.getElementById(`contents`);
function getPointers() {
    const qrdisplaycontainer = document.querySelector(`#contents #qrdisplaycontainer`) as unknown as SVGAElement;
    const qrgenbtn = document.querySelector('#contents #qrgenbtn');
    const vcardqrgenbtn = document.querySelector('#contents #vcardqrgenbtn');
    const qrdldbtn = document.querySelector('#contents #qrdldbtn');
    const qrlink = document.querySelector('#contents #qrdldlink') as HTMLAnchorElement;
    const qrdisplay = document.querySelector(`#contents #qrdisplay`);
    const qrdata = document.querySelector(`#contents #qrdata`) as HTMLInputElement;
    return {
        qrdata,
        qrdisplaycontainer,
        qrdisplay,
        qrdldbtn,
        qrgenbtn,
        qrlink,
        vcardqrgenbtn
    }
}
function getInputValue(id: string): string | undefined {
    const i = document.querySelector(`#contents #${id}`) as HTMLInputElement;
    return i?.value;
}
async function generateAndDisplayQr(data?: string) {
    console.log(`gen and display qr`);
    const { qrdata, qrdisplay, qrdisplaycontainer, qrdldbtn } = getPointers();
    if (!data && !qrdata?.value) {
const qrdisplaycontainer = document.getElementById(`qrdisplaycontainer`) as unknown as SVGAElement;
const qrgenbtn = document.getElementById('qrgenbtn');
const qrdldbtn = document.getElementById('qrdldbtn');
const qrlink = document.getElementById('qrdldlink') as HTMLAnchorElement;
const qrdisplay = document.getElementById(`qrdisplay`);
const qrdata = document.getElementById(`qrdata`) as HTMLInputElement;
async function generateAndDisplayQr() {
    if (!qrdata?.value)
        return;
    }
    qrdisplay.innerHTML = ``;
    const { svg, width, height } = await window.qrapi.qrcodesvg(data || qrdata.value);
    // console.log(`qrcodesvg returned ${width} & ${height}`);
    qrdisplaycontainer.setAttribute(`viewBox`, `0 0 ${width} ${height}`);
    qrdisplay.innerHTML = svg;
    // setDownloadButtonBlob();
    qrdldbtn.removeAttribute(`disabled`);
}
function setDownloadButtonBlob() {
    console.log(`set dl`);
    const { qrdisplaycontainer, qrlink } = getPointers();
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
async function downloadQr() {
    console.log(`dowload clicked`);
    const { qrlink } = getPointers();
    await setDownloadButtonBlob();
    qrlink.click();
}
function addPageEventListeners(pageName: string) {
    try {
        const { qrgenbtn, qrdldbtn, vcardqrgenbtn } = getPointers();
        if (pageName === `plaintext`) {
            qrgenbtn.addEventListener(`click`, () => generateAndDisplayQr());
        }
        qrdldbtn.addEventListener(`click`, downloadQr);
    } catch (err) {
        console.log(`Cannot add page listeners: ${err.message}`);
    }
}

// interface ImportHTMLLinkElement extends HTMLLinkElement {
//     import: HTMLElement;
// }

function changePage(pageName: string) {
    console.log(`changing page to ${pageName}`)
    // const links = document.querySelectorAll(`link[rel = "import"][data-page= "${pageName}"]`) as NodeListOf<ImportHTMLLinkElement>;
    // const link = links[0];
    // if (!link) return;
    // const template = link.import.querySelector('template');
    const template = document.getElementById(`template-${pageName}`) as HTMLTemplateElement;
    if (!template) {
        console.log(`template not found`);
        return;
    }
    const clone = document.importNode(template.content, true);

    pageContentDiv.innerHTML = ``;
    pageContentDiv.appendChild(clone);

    addPageEventListeners(pageName);
}

Array.prototype.forEach.call(document.getElementsByClassName(`nav-link`), (element: HTMLElement) => {
    element.addEventListener(`click`, function () {
        changePage(element.dataset.page);
    });
});

