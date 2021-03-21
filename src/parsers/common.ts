import { LocalizedString, LocalizedStringArray } from "../types/app";

export function parseString(value: any): string {
    if (typeof value == "string") {
        return value;
    }
    if (value && typeof value.toString === "function") {
        return value.toString();
    }
    return "";
}

export function parseStringArray(array: any[]): string[] {
    const stringArray: string[] = [];
    for(let value of array) {
        stringArray.push(parseString(value));
    }
    return stringArray;
}

export function parseLocalizedString(value: any): LocalizedString {
    if (typeof value === "string") {
        return {
            ru: value,
            en: value
        }
    }
    if (value && typeof value === "object") {
        return {
            ru: parseString(value.ru),
            en: parseString(value.en)
        }
    }
    return {
        ru: "",
        en: ""
    }
}

export function parseLocalizedStringArray(value: any): LocalizedStringArray {
    if (Array.isArray(value)) {
        const stringArray = parseStringArray(value);
        return {
            ru: stringArray,
            en: stringArray
        }
    }
    if (value && typeof value === "object") {
        return {
            ru: parseStringArray(value.ru),
            en: parseStringArray(value.en)
        }
    }
    return {
        ru: [],
        en: []
    }
}