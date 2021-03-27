import {isArray, isNumber, isNumeric, isObject, isSet, isString} from '@taufik-nurrohman/is';

export const toArray = x => isArray(x) ? x : [x];
export const toArrayKey = (x, data) => {
    let i = data.indexOf(x);
    return -1 !== i ? i : null;
};
export const toArrayValue = (x, data) => {
    let i = data.indexOf(x);
    return -1 !== i ? data[i] : null;
};
export const toBoolean = x => !!x;
export const toCaseCamel = x => x.replace(/[-_.](\w)/g, (m0, m1) => toCaseUpper(m1));
export const toCaseKebab = (x, separator = '-') => x.replace(/[A-Z]/g, m0 => separator + toCaseLower(m0)).replace(/\W+/g, separator);
export const toCaseLower = x => x.toLowerCase();
export const toCasePascal = x => x.replace(/(?:^|[-_.])(\w)/g, (m0, m1) => toCaseUpper(m1));
export const toCaseUpper = x => x.toUpperCase();
export const toCeil = x => isNumber(x) ? Math.ceil(x) : null;
export const toCount = x => x.length;
export const toEdge = (x, edges) => {
    if (isSet(edges[0]) && x < edges[0]) {
        return edges[0];
    }
    if (isSet(edges[1]) && x > edges[1]) {
        return edges[1];
    }
    return x;
};
export const toFixed = (x, base) => isNumber(x) ? x.toFixed(base) : null;
export const toFloor = x => isNumber(x) ? Math.floor(x) : x;
export const toHTML = x => {
    return x
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
};
export const toJSON = x => JSON.stringify(x);
export const toNumber = (x, base = 10) => base ? parseInt(x, base) : parseFloat(x);
export const toObjectCount = x => toCount(toObjectKeys(x));
export const toObject = x => Object.create(x);
export const toObjectEntries = x => Object.entries(x);
export const toObjectKey = (x, data) => {
    for (let key in data) {
        if (x === data[key]) {
            return key;
        }
    }
    return null;
};
export const toObjectKeys = x => Object.keys(x);
export const toObjectValue = (x, data) => x in data ? data[x] : null;
export const toObjectValues = x => Object.values(x);
export const toRound = x => isNumber(x) ? Math.round(x) : null;
export const toString = (x, base = 10) => isObject(x) && 'toString' in x ? x.toString(base) : "" + x;
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
    if ('false' === x) {
        return false;
    }
    if ('null' === x) {
        return null;
    }
    if ('true' === x) {
        return true;
    }
    return x;
};
