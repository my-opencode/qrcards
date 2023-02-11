import * as QRCode from "qrcode";
export function qrobjHandler(event: Event, data: string, o?: QRCode.QRCodeOptions): QRCode.QRCode {
  console.log(`create qr code for`, data);
  const qrobj = QRCode.create(data, o);
  return qrobj;
}