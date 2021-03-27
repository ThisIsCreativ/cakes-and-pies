import { INTL } from "../constants/intl";
import { MODALS } from "../constants/modal";
import { CATALOG } from "../constants/catalog";
import { IntlState } from "./intl";
import { ModalsAction, ModalsState } from "./modals";
import { CatalogAction, CatalogState } from "./catalog";

export interface NewsItem {
    date: string
    title: string
    text: string
    image?: string
}

export interface FetchError {
    messageId: string,
    errorCode: number
}

export function isFetchError(object: any): object is FetchError {
    return object && typeof object.errorCode == "number";
}

export interface LocalizedString {
    ru: string
    en: string
}

export interface LocalizedStringArray {
    ru: string[]
    en: string[]
}

export interface ApplicationState {
    [INTL]: IntlState
    [MODALS]: ModalsState
    [CATALOG]: CatalogState
}

export type ApplicationAction = CatalogAction | ModalsAction;