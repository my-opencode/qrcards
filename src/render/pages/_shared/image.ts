export async function svgToPng(svg: SVGAElement): Promise<string> {
  const clonedSvg = svg.cloneNode(true) as SVGSVGElement;
  clonedSvg.removeAttribute('class');
  let { width, height } = (clonedSvg as unknown as SVGSVGElement).getBBox();
  if (!width) width = clonedSvg.getBoundingClientRect().width || 2000;
  if (!height) height = clonedSvg.getBoundingClientRect().height || 2000;
  const svgBlob = new Blob([clonedSvg.outerHTML], { type: 'image/svg+xml' });
  // svg blob to canvas blob url
  const DOMURL = window.URL || window.webkitURL; // || window;
  const svgBlobUrl = DOMURL.createObjectURL(svgBlob);
  // create & load image
  const img = new Image();
  const downloadUrl: string = await new Promise(r => {
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
      DOMURL.revokeObjectURL(svgBlobUrl);
      r(pngDataUrl);
    };
    // init image
    img.src = svgBlobUrl;
  });
  return downloadUrl;
}

export function getBase64String(dataURL: string): string {
  const idx = dataURL.indexOf('base64,') + 'base64,'.length;
  return dataURL.substring(idx);
}