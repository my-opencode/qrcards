import { getPointers } from "./pointers.js";
import {vcardsEmployeeRowSelector} from "./index.js";
import { IVcardEmployeeForm } from "../../../types.js";

function vcardsRmvDataRow(event: MouseEvent) {
  if (event.target instanceof HTMLButtonElement) {
    const rowi = event.target.dataset.row;
    const row = document.querySelector(`#contents #vc-${rowi}`);
    if (row) row.remove();
  }
}

export async function vcardsAddDataRow(event?: Event|MouseEvent, employeeData?: IVcardEmployeeForm):Promise<void> {
  console.log(`add data row`);
  const { employee_form_fields } = await window.dataapi.getappdata();
  const { vcardsTable } = getPointers(/* document */);
  if (!vcardsTable) return;
  const rowi = Array.from(vcardsTable.querySelectorAll(vcardsEmployeeRowSelector)).length;

  const row = document.createElement(`tr`);
  row.setAttribute(`id`, `vc-${rowi}`);
  row.setAttribute(`data-row`, `${rowi}`);
  row.setAttribute(`data-is-employee-row`, `true`);
  // select
  {
    const td = document.createElement(`td`);
    const i = document.createElement(`input`);
    i.setAttribute(`type`, `checkbox`);
    i.setAttribute(`id`, `vc-${rowi}-select`);
    i.setAttribute(`data-row`, `${rowi}`);
    i.classList.add(`data-row-selector`);
    td.appendChild(i);
    row.appendChild(td);
  }
  // fields
  for (const f of employee_form_fields) {
    const td = document.createElement(`td`);
    const i = document.createElement(`input`);
    i.setAttribute(`type`, `text`);
    i.setAttribute(`id`, `vc-${rowi}-${f}`);
    i.setAttribute(`size`, `10`);
    if (employeeData?.[f])
      i.setAttribute(`value`, employeeData[f]||``);
    td.appendChild(i);
    row.appendChild(td);
  }
  // actions & hidden svg
  {
    const td = document.createElement(`td`);
    const b = document.createElement(`button`);
    b.setAttribute(`class`, `delete-row-btn`);
    b.setAttribute(`data-row`, `${rowi}`);
    b.innerText = `X`;
    b.addEventListener(`click`, vcardsRmvDataRow);
    td.appendChild(b);
    const svgDiv = document.createElement(`div`);
    svgDiv.setAttribute(`id`,  `qr-${rowi}`);
    td.appendChild(svgDiv);
    // const s = document.createElementNS('http://www.w3.org/2000/svg', `svg`);
    // s.classList.add(`no-display`);
    // s.setAttribute(`xmlns`, 'http://www.w3.org/2000/svg');
    // s.setAttribute(`id`, `qr-${rowi}`);
    // s.setAttribute(`height`, `2000`);
    // s.setAttribute(`width`, `2000`);
    // s.setAttribute(`preserveAspectRatio`, "xMidYMid meet");
    // const sdef = document.createElementNS('http://www.w3.org/2000/svg', `def`);
    // const sdefr = document.createElementNS('http://www.w3.org/2000/svg', `rect`);
    // sdefr.setAttribute(`id`, `dot`);
    // sdefr.setAttribute(`height`, `10.15`);
    // sdefr.setAttribute(`width`, `10.15`);
    // // sdefr.setAttribute(`fill`, `black`);
    // sdef.appendChild(sdefr);
    // s.appendChild(sdef);
    // const sqr = document.createElementNS('http://www.w3.org/2000/svg', `g`);
    // sqr.setAttribute(`id`, `qrdisplay-${rowi}`);
    // s.appendChild(sqr);
    // td.appendChild(s);
    row.appendChild(td);
  }
  vcardsTable.appendChild(row);
}