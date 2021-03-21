import { createReducer } from "@reduxjs/toolkit";
import { SEND_CATALOG_DATA, SEND_CATALOG_FETCH_ERROR, SEND_CATALOG_FETCH_START } from "../constants/catalog";
import { FetchError } from "../types/app";
import { CatalogItem, CatalogState, SendCatalogData, SendCatalogFetchError } from "../types/catalog";

const initialState: CatalogState = {
    fetched: false,
    loading: false,
    error: false,
    items: [],
    itemById: {},
    activeItem: null
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

export default createReducer(initialState, (builder) => {
    builder
        .addCase(SEND_CATALOG_FETCH_START, (state, action) => receiveCatalogFetchStart(state))
        .addCase(SEND_CATALOG_DATA, (state, action) => receiveCatalogData(state, (action as SendCatalogData).payload))
        .addCase(SEND_CATALOG_FETCH_ERROR, (state, action) => receiveCatalogFetchError(state, (action as SendCatalogFetchError).payload))
});