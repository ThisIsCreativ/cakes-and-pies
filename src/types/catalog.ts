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
    filter: CatalogFilterInfo | null
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
    standartWeight?: number
}

export interface CatalogCountingItem extends CatalogCommonItem {
    priceByItem: number
    standartCount?: number
}

export function isWeightItem(item: CatalogItem): item is CatalogWeightItem {
    return typeof (item as CatalogWeightItem).priceByKg !== "undefined";
}

export function isCountingItem(item: CatalogItem): item is CatalogCountingItem {
    return typeof (item as CatalogCountingItem).priceByItem !== "undefined";
}

export type CatalogItem = CatalogWeightItem | CatalogCountingItem;

export interface CatalogCategory {
    label: LocalizedString
    items: CatalogItem[]
}

export interface CatalogFilterInfo {
    groups: string[]
    ingridients: string[]
}

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