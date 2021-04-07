export const CATALOG = "catalog";

export const CATALOG_BASE_URL = "resources/data/catalog"
export const CATALOG_LIST_URL = CATALOG_BASE_URL + "/list.json"

/***********
 * Actions *
 ***********/
export const SEND_CATALOG_FETCH_START  = "SEND_CATALOG_FETCH_START";
export type SEND_CATALOG_FETCH_START  = typeof SEND_CATALOG_FETCH_START;

export const SEND_CATALOG_FETCH_ERROR  = "SEND_CATALOG_FETCH_ERROR";
export type SEND_CATALOG_FETCH_ERROR  = typeof SEND_CATALOG_FETCH_ERROR;

export const SEND_CATALOG_DATA  = "SEND_CATALOG_DATA";
export type SEND_CATALOG_DATA  = typeof SEND_CATALOG_DATA;

export const SEND_FILTER_ITEM  = "SEND_FILTER_ITEM";
export type SEND_FILTER_ITEM  = typeof SEND_FILTER_ITEM;