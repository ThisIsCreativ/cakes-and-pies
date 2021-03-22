import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import shortid from "shortid";
import { CATALOG, CATALOG_LIST_URL, SEND_CATALOG_DATA, SEND_CATALOG_FETCH_ERROR, SEND_CATALOG_FETCH_START } from "../constants/catalog";
import { parseLocalizedString, parseLocalizedStringArray } from "../parsers/common";
import { ApplicationAction, ApplicationState, FetchError } from "../types/app";
import {
    CatalogItem,
    CatalogCommonItem,
    CatalogWeightItem,
    CatalogCountingItem,
    SendCatalogFetchError,
    SendCatalogFetchStart,
    SendCatalogData,
    CatalogAction
} from "../types/catalog";

/*******************
 * Fetch functions *
 *******************/
async function fetchCatalogData(dispatch: ThunkDispatch<ApplicationState, {}, CatalogAction>) {
    const response = await fetch(CATALOG_LIST_URL);

    if (!response.ok) {
        dispatch(sendCatalogFetchError({ messageId: "CATALOG_FETCH_ERROR", errorCode: response.status }));
        return;
    }

    try {
        const json = await response.json();
        dispatch(sendCatalogData(parseCatalogData(json)));
    } catch (e) {
        console.warn(e);
        dispatch(sendCatalogFetchError({ messageId: "CATALOG_FETCH_ERROR", errorCode: -1 }));
    }
}

/***********
 * Parsers *
 ***********/
function parseCatalogData(json: any): CatalogItem[] {
    const items: CatalogItem[] = [];
    if (!Array.isArray(json)) {
        return items;
    }
    for (let jsonItem of json) {
        const commonItem: CatalogCommonItem = {
            id: shortid.generate(),
            images: jsonItem.images || [],
            title: parseLocalizedString(jsonItem.title),
            description: parseLocalizedString(jsonItem.description),
            ingridients: parseLocalizedStringArray(jsonItem.ingridients)
        };
        if (jsonItem.priceByKg) {
            const item: CatalogWeightItem = Object.assign({ priceByKg: jsonItem.priceByKg }, commonItem);
            items.push(item);
        } else if (jsonItem.priceByItem) {
            const item: CatalogCountingItem = Object.assign({ priceByItem: jsonItem.priceByItem }, commonItem);
            items.push(item);
        }
    }
    return items;
}

/*****************
 * Plain actions *
 *****************/
export function sendCatalogFetchStart(): SendCatalogFetchStart {
    return {
        type: SEND_CATALOG_FETCH_START,
        payload: null
    }
}

export function sendCatalogFetchError(error: FetchError): SendCatalogFetchError {
    return {
        type: SEND_CATALOG_FETCH_ERROR,
        payload: {
            error: error
        }
    }
}

export function sendCatalogData(items: CatalogItem[]): SendCatalogData {
    return {
        type: SEND_CATALOG_DATA,
        payload: {
            items: items
        }
    }
}

/***********
 * Actions *
 ***********/

export function getCatalogData(): ThunkAction<void, ApplicationState, {}, ApplicationAction> {
    return async (dispatch, getState) => {
        const catalogState = getState()[CATALOG];
        if (catalogState.loading) {
            return;
        }

        dispatch(sendCatalogFetchStart());
        fetchCatalogData(dispatch);
    };
}