import { INTL } from "../constants/intl";
import { CATALOG } from "../constants/catalog";
import { IntlState } from "./intl";
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
    [CATALOG]: CatalogState
}

export type ApplicationAction = CatalogAction;