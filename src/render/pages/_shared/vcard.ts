import { IVcardForm } from "../../../types";
export  function getDisplayNameFromFormData(data:IVcardForm):string {
  const displayNameMaxLength = 20;
  if (data.cardDisplayName) return data.cardDisplayName;
  else if (data.fullname) {
    if (data.fullname.length <= displayNameMaxLength)
      return data.fullname;
    else return data.fullname.slice(0, displayNameMaxLength) + `...`;
  }
  return data.names;
}