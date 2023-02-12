import { IVcardForm } from "../types";

export function formToVcard(formObj: IVcardForm): string {
    const vcard = `BEGIN:VCARD
VERSION:4.0${formObj.timezone ? `\nTZ:${formObj.timezone}` : ``
        }${formObj.bday ? `\nBDAY:${formObj.bday}` : ``
        }${formObj.email ? `\nEMAIL:${formObj.email}` : ``
        }${formObj.phonework ? `\nTEL;type=WORK:${formObj.phonework}` : ``
        }${formObj.phonemobile ? `\nTEL;type=WORK;type=CELL:${formObj.phonemobile}` : ``
        }${formObj.phonemobilepersonal ? `\nTEL;type=CELL:${formObj.phonemobilepersonal}` : ``
        }${formObj.websitework ? `\nURL:${formObj.websitework}` : ``
        }${formObj.company ? `\nORG:${formObj.company}` : ``
        }
N:${formObj.surname};${formObj.names};;${formObj.prefix || ``};${formObj.suffix || ``}
FN:${formObj.fullname}
ADR;type=WORK:${formObj.addressdetails};${formObj.addresslocalitycity || ``};${formObj.addressregion || ``};${formObj.addresszip || ``}${formObj.addresscountry || ``}${formObj.title ? `\nTITLE:${formObj.title}` : ``
        }
END:VCARD`;

    return vcard;
}

export function vcardHandler (event:Event, formObj: IVcardForm):string {
  console.log(`build vcard`);
  const vcard = formToVcard(formObj);
  return vcard;
}