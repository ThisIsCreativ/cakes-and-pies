import { Action } from "redux";
import { IntlState } from "./intl";
import { INTL } from "../constants/intl";

export interface ApplicationState {
    [INTL]: IntlState
}

export type ApplicationAction = Action<any>;