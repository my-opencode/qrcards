const qrdisplaycontainer = document.getElementById(`qrdisplaycontainer`) as unknown as SVGAElement;
const qrgenbtn = document.getElementById('qrgenbtn');
const qrdisplay = document.getElementById(`qrdisplay`);
const qrdata = document.getElementById(`qrdata`) as HTMLInputElement;
async function generateAndDisplayQr() {
    if (!qrdata?.value)
        return;
    qrdisplay.innerHTML = ``;
    const { svg, width, height } = await window.qrapi.qrcodesvg(qrdata.value);
    console.log(`qrcodesvg returned ${width} & ${height}`);
    qrdisplaycontainer.setAttribute(`viewBox`, `0 0 ${width} ${height}`);
    qrdisplay.innerHTML = svg;
    // setDownloadButtonBlob();
    qrdldbtn.removeAttribute(`disabled`);
}
qrgenbtn.addEventListener(`click`, generateAndDisplayQr);
}

func()