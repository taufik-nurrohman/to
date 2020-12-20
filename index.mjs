import {isArray, isNumber, isNumeric, isObject} from '@taufik-nurrohman/is';

export const toArray = x => isArray(x) ? x : [x];
export const toBoolean = x => !!x;
export const toCaseCamel = x => x.replace(/[-_.](\w)/g, (m0, m1) => toCaseUpper(m1));
export const toCaseKebab = (x, separator = '-') => x.replace(/[A-Z]/g, m0 => separator + toCaseLower(m0)).replace(/\W+/g, separator);
export const toCaseLower = x => x.toLowerCase();
export const toCasePascal = x => x.replace(/(?:^|[-_.])(\w)/g, (m0, m1) => toCaseUpper(m1));
export const toCaseUpper = x => x.toUpperCase();
export const toCeil = x => isNumber(x) ? Math.ceil(x) : null;
export const toFixed = (x, base) => isNumber(x) ? x.toFixed(base) : null;
export const toFloor = x => isNumber(x) ? Math.floor(x) : x;
export const toHTML = x => {
    return x
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
};
export const toJSON = x => JSON.stringify(x);
export const toNumber = (x, base = 10) => parseInt(x, base);
export const toRound = x => isNumber(x) ? Math.round(x) : null;
export const toString = (x, base = 10) => x && 'toString' in x ? x.toString(base) : "" + x;
export const toURL = x => decodeURIComponent(x);
export const toValue = x => {
    if (isArray(x)) {
        return x.map(v => toValue(v));
    }
    if (isNumeric(x)) {
        return toNumber(x);
    }
    if (isObject(x)) {
        for (let k in x) {
            x[k] = toValue(x[k]);
        }
        return x;
    }
    return ({
        'false': false,
        'null': null,
        'true': true
    })[x] || x;
};
