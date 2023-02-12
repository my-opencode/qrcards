import { IApplicationState } from "./types";

export const applicationState: IApplicationState = {
  pageName: ``
};

export function statePageUpdateHandler(event: Event, pageName: string):void {
  applicationState.pageName = pageName;
}