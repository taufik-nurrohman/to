import {fromStates, fromValue} from '@taufik-nurrohman/from';
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
export const toFix = (x, base) => isNumber(x) ? x.toFixed(base) : null;
export const toFloor = x => isNumber(x) ? Math.floor(x) : null;
export const toHTML = (x, restoreQuote = true) => {
    x = x.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    if (restoreQuote) {
        x = x.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
    }
    return x;
};
export const toJSON = x => JSON.stringify(x);
export const toMapCount = x => x.size;
export const toNumber = (x, base = 10) => base ? parseInt(x, base) : parseFloat(x);
export const toObject = x => Object.create(x);
export const toObjectCount = x => toCount(toObjectKeys(x));
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
function _toQueryDeep(query, key) {
    let out = {},
        suffix = key ? '%5D' : "", i, k, v;
    for (i in query) {
        k = toURL(i);
        v = query[i];
        if (isObject(v)) {
            out = fromStates({}, out, _toQueryDeep(v, key + k + suffix + '%5B'));
        } else {
            out[key + k + suffix] = v;
        }
    }
    return out;
}
export const toQuery = x => {
    let list = [],
        query = _toQueryDeep(x, ""), k, v;
    for (k in query) {
        v = query[k];
        // `{"a":"true","b":true}` â†’ `a=true&b`
        v = true !== v ? '=' + toURL(fromValue(v)) : "";
        list.push(k + v);
    }
    return toCount(list) ? '?' + list.join('&') : null;
};
export const toRound = x => isNumber(x) ? Math.round(x) : null;
export const toSetCount = x => x.size;
export const toString = (x, base = 10) => isNumber(x) ? x.toString(base) : "" + x;
export const toURL = x => encodeURIComponent(x);
export const toValue = x => {
    if (isArray(x)) {
        return x.map(v => toValue(v));
    }
    if (isObject(x)) {
        for (let k in x) {
            x[k] = toValue(x[k]);
        }
        return x;
    }
    if (isString(x) && isNumeric(x)) {
        if ('0' === x[0] && -1 === x.indexOf('.')) {
            return x;
        }
        return toNumber(x);
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