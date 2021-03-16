import { Action } from "redux";
import { IntlState } from "./intl";
import { INTL } from "../constants/intl";

export interface NewsItem {
    date: string
    title: string
    text: string
    image?: string
}

export interface ApplicationState {
    [INTL]: IntlState
}

export type ApplicationAction = Action<any>;