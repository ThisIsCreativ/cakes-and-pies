import moment from 'moment';

//English
import enMessages from '../messages/en.json';

//Russian
import ruMessages from '../messages/ru.json';
import { IntlState, LocaleMessages, TranslationMap, AcceptableLocales } from '../types/intl.js';

export const LOCALE_MAP: TranslationMap = {
    en: enMessages,
    ru: ruMessages
}

function fixLocale(locale: string): AcceptableLocales {
    if (typeof locale != 'string') {
        return 'en';
    }
    locale = locale.toLowerCase();
    if (!LOCALE_MAP[locale]) {
        return 'en';
    }
    return locale as AcceptableLocales;
}

export function updateLocale(_locale: string): AcceptableLocales {
    //Fix locale name
    const locale = fixLocale(_locale);
    //Hack: Change locale in datepicker
    moment.locale(locale);
    //Hack (todo localize)
    moment.updateLocale(moment.locale(), { invalidDate: "Неверная дата" });
    //Correct locale name
    return locale;
}

export function initLocale(_locale: string): IntlState {
    //Fix locale name
    const locale: AcceptableLocales = updateLocale(_locale);
    //Return initial state of i18n
    return { locale, messages: LOCALE_MAP[locale] };
}

export function getDefaultLocale():AcceptableLocales{
    return 'ru';
}