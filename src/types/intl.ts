export interface IntlState {
    locale: AcceptableLocales
    messages: LocaleMessages
}

export interface TranslationMap {
    [locale: string]: LocaleMessages
}

export interface LocaleMessages {
    [k: string]: string
}

export type AcceptableLocales = 'ru' | 'en';    