import { Action } from "@reduxjs/toolkit";
import { SEND_CATALOG_DATA, SEND_CATALOG_FETCH_ERROR, SEND_CATALOG_FETCH_START } from "../constants/catalog";
import { FetchError, LocalizedString, LocalizedStringArray } from "./app";

export interface CatalogState {
    fetched: boolean
    loading: boolean
    error: boolean
    items: string[]
    itemById: { [k: string]: CatalogItem }
    activeItem: string | null
}

export interface CatalogCommonItem {
    id: string
    category: LocalizedString
    images: string[]
    title: LocalizedString
    description: LocalizedString
    ingridients: LocalizedStringArray
}

export interface CatalogWeightItem extends CatalogCommonItem {
    priceByKg: number
}

export interface CatalogCountingItem extends CatalogCommonItem {
    priceByItem: number
}

export type CatalogItem = CatalogWeightItem | CatalogCountingItem;

/***********
 * Actions *
 ***********/
export interface SendCatalogFetchStart extends Action {
    type: SEND_CATALOG_FETCH_START,
    payload: null
}

export interface SendCatalogFetchError extends Action {
    type: SEND_CATALOG_FETCH_ERROR,
    payload: {
        error: FetchError
    }
}

export interface SendCatalogData extends Action {
    type: SEND_CATALOG_DATA,
    payload: {
        items: CatalogItem[]
    }
}

export type CatalogAction = SendCatalogFetchStart | SendCatalogFetchError | SendCatalogData;