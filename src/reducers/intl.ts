import { createReducer } from "@reduxjs/toolkit";
import { IntlState } from "../types/intl";
import { getDefaultLocale, LOCALE_MAP } from "../services/intl";

const defaultLocale = getDefaultLocale();

const initialState: IntlState = {
    locale: defaultLocale,
    messages: LOCALE_MAP[defaultLocale]
}

export default createReducer(initialState, {
});