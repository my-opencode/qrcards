import { PageNames } from "../types";
 
import * as plaintext from "./pages/plaintext/index.js";
import * as vcard from "./pages/vcard/index.js";
import * as vcards from "./pages/vcards/index.js";
import * as styler from "./pages/styler/index.js";

const pages = {
    plaintext,
    vcard,
    vcards,
    styler
};

const pageContentDiv = document.getElementById(`contents`);

// Common
function userMessage(text: string) {
    const d = document.createElement(`div`);
    d.classList.add(`user-message`);
    const p = document.createElement(`p`);
    p.innerText = text;
    d.appendChild(p);
    document.getElementsByTagName(`body`)[0].appendChild(d);
    setTimeout(() => d.remove(), 5000);
}
window.userMessage = userMessage;

window.dataapi.handleMenuAppDataLoaded(function () {
    userMessage(`Data loaded`);
    window.applyData();
});

window.pageapi.handleGoTo(function (eventPhantom: Event, pageName: PageNames) {
    changePage(pageName);
});
function changePage(pageName: PageNames) {
    console.log(`changing page to ${pageName}`);

    const template = document.getElementById(`template-${pageName}`) as HTMLTemplateElement;
    if (!template) {
        console.log(`template not found`);
        return;
    }
    const clone = document.importNode(template.content, true);

    pageContentDiv.innerHTML = ``;
    pageContentDiv.appendChild(clone);

    window.pageapi.pageChanged(pageName);
    // window[`page_${pageName}`].init(/* window, document */);
    pages[pageName].init(/* window, document */);
}

changePage(`vcards`);