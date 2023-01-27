const pageContentDiv = document.getElementById(`contents`);
function getPointers() {
    const qrdisplaycontainer = document.querySelector(`#contents #qrdisplaycontainer`) as unknown as SVGAElement;
    const qrgenbtn = document.querySelector('#contents #qrgenbtn');
    const vcardqrgenbtn = document.querySelector('#contents #vcardqrgenbtn');
    const qrdldbtn = document.querySelector('#contents #qrdldbtn');
    const qrlink = document.querySelector('#contents #qrdldlink') as HTMLAnchorElement;
    const qrdisplay = document.querySelector(`#contents #qrdisplay`);
    const qrdata = document.querySelector(`#contents #qrdata`) as HTMLInputElement;
    const vcardsTable = document.querySelector(`#contents #vcards-employee-data`);
    const vcardsAddRowBtn = document.querySelector(`#contents #vcards-add-data-row-btn`);
    const vcardsGenBtn = document.querySelector(`#contents #vcardsgenbtn`);
    const vcardsDldBtn = document.querySelector(`#contents #vcardsdldbtn`);
    return {
        qrdata,
        qrdisplaycontainer,
        qrdisplay,
        qrdldbtn,
        qrgenbtn,
        qrlink,
        vcardqrgenbtn,
        vcardsAddRowBtn,
        vcardsDldBtn,
        vcardsGenBtn,
        vcardsTable
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
        userMessage(`No data for qr. Skipping generation.`)
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
function getVcardFormData(): {
    timezone?: string;
    bday?: string;
    email?: string;
    phonework?: string;
    phonemobile?: string;
    phonemobilepersonal?: string;
    websitework?: string;
    company?: string;
    surname: string;
    names: string;
    prefix?: string;
    suffix?: string;
    fullname: string;
    addressdetails?: string;
    addresslocalitycity?: string;
    addressregion?: string;
    addresszip?: string;
    addresscountry?: string;
    title?: string;
} {
    console.log(`get vcard values`);
    const getVcInputValue = (vn: string) => getInputValue(`vc-${vn}`);
    const surname = getVcInputValue(`surname`);
    const names = getVcInputValue(`names`);
    const fullname = getVcInputValue(`fullname`);
    const addressdetails = getVcInputValue(`addressdetails`);
    if (!surname || !names || !fullname /* || !addressdetails */) {
        userMessage(`Form incomplete: Missing ${[
            !surname ? `surname` : ``,
            !names ? ` names` : ``,
            !fullname ? ` full name` : ``,
            !addressdetails ? `surname` : ``
        ].filter(a => a).join(`, `)
            } `);
        throw new TypeError(`Vcard Form Incomplete`);
    }
    return {
        timezone: getVcInputValue(`timezone`),
        bday: getVcInputValue(`bday`),
        email: getVcInputValue(`email`),
        phonework: getVcInputValue(`phonework`),
        phonemobile: getVcInputValue(`phonemobile`),
        phonemobilepersonal: getVcInputValue(`phonemobilepersonal`),
        websitework: getVcInputValue(`websitework`),
        company: getVcInputValue(`company`),
        surname,
        names,
        prefix: getVcInputValue(`prefix`),
        suffix: getVcInputValue(`suffix`),
        fullname,
        addressdetails,
        addresslocalitycity: getVcInputValue(`addresslocalitycity`),
        addressregion: getVcInputValue(`addressregion`),
        addresszip: getVcInputValue(`addresszip`),
        addresscountry: getVcInputValue(`addresscountry`),
        title: getVcInputValue(`title`)

    }
}

function vcardsRmvDataRow(event: MouseEvent) {
    if (event.target instanceof HTMLButtonElement) {
        const rowi = event.target.dataset.row;
        const row = document.querySelector(`#contents #vc-${rowi}`);
        if (row) row.remove();
    }
}
function vcardsAddDataRow() {
    console.log(`add data row`);
    const { vcardsTable } = getPointers();
    if (!vcardsTable) return;
    const rowi = Array.from(vcardsTable.getElementsByTagName(`tr`)).length + 1;
    const fields = [
        `prefix`, `surname`, `names`, `suffix`, `fullname`, `title`, `bdate`, `email`, `phonework`, `phonemobile`, `phonemobilepersonal`
    ];

    const row = document.createElement(`tr`);
    row.setAttribute(`id`, `vc-${rowi}`)
    {
        const td = document.createElement(`td`);
        const i = document.createElement(`input`);
        i.setAttribute(`type`, `checkbox`);
        i.setAttribute(`id`, `vc-${rowi}-select`)
        td.appendChild(i);
        row.appendChild(td);
    }
    for (const f of fields) {
        const td = document.createElement(`td`);
        const i = document.createElement(`input`);
        i.setAttribute(`type`, `text`);
        i.setAttribute(`id`, `vc-${rowi}-${f}`)
        td.appendChild(i);
        row.appendChild(td);
    }
    {
        const td = document.createElement(`td`);
        const b = document.createElement(`button`);
        b.setAttribute(`class`, `delete-row-btn`);
        b.setAttribute(`data-row`, `${rowi}`);
        b.innerText = `X`;
        b.addEventListener(`click`, vcardsRmvDataRow)
        td.appendChild(b);
        row.appendChild(td);
    }
    vcardsTable.appendChild(row);
}

function addPageEventListeners(pageName: string) {
    try {
        const { qrgenbtn, qrdldbtn, vcardqrgenbtn, vcardsAddRowBtn } = getPointers();
        if (pageName === `plaintext`) {
            qrgenbtn.addEventListener(`click`, () => generateAndDisplayQr());
        } else if (pageName === `vcard`) {
            vcardqrgenbtn.addEventListener(`click`, async function () {
                const vcard = await window.vcardapi.vcard(getVcardFormData());
                generateAndDisplayQr(vcard);
            });
        }
        if ([`plaintex`, `vcard`].includes(pageName))
            qrdldbtn.addEventListener(`click`, downloadQr);
        if(pageName === `vcards`) {
            vcardsAddRowBtn.addEventListener(`click`, vcardsAddDataRow);
        }
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

function userMessage(text: string) {
    const d = document.createElement(`div`);
    d.classList.add(`user-message`);
    const p = document.createElement(`p`);
    p.innerText = text;
    d.appendChild(p);
    document.getElementsByTagName(`body`)[0].appendChild(d);
    setTimeout(() => d.remove(), 5000);
}