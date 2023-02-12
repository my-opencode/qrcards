export function getInputValue(id: string): string | undefined {
  const i = document.querySelector(`#contents #${id}`) as HTMLInputElement;
  return i?.value;
}
export function setInputValue(id: string, value: string):void {
  const i = document.querySelector(`#contents #${id}`) as HTMLInputElement;
  i.value = value;
}