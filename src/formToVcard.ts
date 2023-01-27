export interface IVcardForm {
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
}
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