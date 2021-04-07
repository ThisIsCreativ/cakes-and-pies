import { createReducer } from "@reduxjs/toolkit";
import { SEND_CATALOG_DATA, SEND_CATALOG_FETCH_ERROR, SEND_CATALOG_FETCH_START, SEND_FILTER_ITEM } from "../constants/catalog";
import { FetchError } from "../types/app";
import { AcceptableFilterType, CatalogItem, CatalogState, SendCatalogData, SendCatalogFetchError, SendFilterItem } from "../types/catalog";

const initialState: CatalogState = {
    fetched: false,
    loading: false,
    error: false,
    items: [],
    itemById: {},
    activeItem: null,
    filter: {
        enabledGroups: 0,
        enabledIngridients: 0,
        groups: {},
        ingridients: {}
    }
}

function receiveCatalogFetchStart(state: CatalogState) {
    state.loading = true;
    state.error = false;
}

function receiveCatalogData(state: CatalogState, payload: { items: CatalogItem[] }) {
    state.loading = false;
    state.error = false;
    state.fetched = true;
    state.items = [];
    state.itemById = {};
    for (let item of payload.items) {
        state.items.push(item.id);
        state.itemById[item.id] = item;
    }
    state.activeItem = null;
}

function receiveCatalogFetchError(state: CatalogState, payload: { error: FetchError }) {
    state.loading = false;
    state.error = true;
}

function receiveFilterItem(state: CatalogState, payload: { type: AcceptableFilterType, item: string }) {
    const value = (state.filter as any)[payload.type][payload.item];
    if (value) {
        (state.filter as any)[payload.type][payload.item] = false;
        if(payload.type === "groups") {
            state.filter.enabledGroups--;
        } else {
            state.filter.enabledIngridients--;
        }
    } else if (value === false) {
        delete ((state.filter as any)[payload.type][payload.item]);
    } else {
        (state.filter as any)[payload.type][payload.item] = true;
        if(payload.type === "groups") {
            state.filter.enabledGroups++;
        } else {
            state.filter.enabledIngridients++;
        }
    }
}

export default createReducer(initialState, (builder) => {
    builder
        .addCase(SEND_CATALOG_FETCH_START, (state, action) => receiveCatalogFetchStart(state))
        .addCase(SEND_CATALOG_DATA, (state, action) => receiveCatalogData(state, (action as SendCatalogData).payload))
        .addCase(SEND_CATALOG_FETCH_ERROR, (state, action) => receiveCatalogFetchError(state, (action as SendCatalogFetchError).payload))
        .addCase(SEND_FILTER_ITEM, (state, action) => receiveFilterItem(state, (action as SendFilterItem).payload))
});