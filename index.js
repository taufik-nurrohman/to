const {fromStates, fromValue} = require('@taufik-nurrohman/from');
const {isArray, isNumber, isNumeric, isObject, isSet} = require('@taufik-nurrohman/is');

const toArray = x => isArray(x) ? x : [x];
const toArrayKey = (x, data) => {
    let i = data.indexOf(x);
    return -1 !== i ? i : null;
};
const toArrayValue = (x, data) => {
    let i = data.indexOf(x);
    return -1 !== i ? data[i] : null;
};
const toBoolean = x => !!x;
const toCaseCamel = x => x.replace(/[-_.](\w)/g, (m0, m1) => toCaseUpper(m1));
const toCaseKebab = (x, separator = '-') => x.replace(/[A-Z]/g, m0 => separator + toCaseLower(m0)).replace(/\W+/g, separator);
const toCaseLower = x => x.toLowerCase();
const toCasePascal = x => x.replace(/(?:^|[-_.])(\w)/g, (m0, m1) => toCaseUpper(m1));
const toCaseUpper = x => x.toUpperCase();
const toCeil = x => isNumber(x) ? Math.ceil(x) : null;
const toCount = x => x.length;
const toEdge = (x, edges) => {
    if (isSet(edges[0]) && x < edges[0]) {
        return edges[0];
    }
    if (isSet(edges[1]) && x > edges[1]) {
        return edges[1];
    }
    return x;
};
const toFix = (x, base) => isNumber(x) ? x.toFixed(base) : null;
const toFloor = x => isNumber(x) ? Math.floor(x) : null;
const toHTML = (x, restoreQuote = true) => {
    x = x.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    if (restoreQuote) {
        x = x.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
    }
    return x;
};
const toJSON = x => JSON.stringify(x);
const toNumber = (x, base = 10) => base ? parseInt(x, base) : parseFloat(x);
const toObjectCount = x => toCount(toObjectKeys(x));
const toObjectEntries = x => Object.entries(x);
const toObjectKey = (x, data) => {
    for (let key in data) {
        if (x === data[key]) {
            return key;
        }
    }
    return null;
};
const toObjectKeys = x => Object.keys(x);
const toObjectValue = (x, data) => x in data ? data[x] : null;
const toObjectValues = x => Object.values(x);
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
const toQuery = x => {
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
const toRound = x => isNumber(x) ? Math.round(x) : null;
const toString = (x, base = 10) => isNumber(x) ? x.toString(base) : "" + x;
const toURL = x => encodeURIComponent(x);
const toValue = x => {
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

Object.assign(exports, {
    toArray,
    toArrayKey,
    toArrayValue,
    toBoolean,
    toCaseCamel,
    toCaseKebab,
    toCaseLower,
    toCasePascal,
    toCaseUpper,
    toCeil,
    toCount,
    toEdge,
    toFix,
    toFloor,
    toHTML,
    toJSON,
    toNumber,
    toObjectCount,
    toObjectEntries,
    toObjectKey,
    toObjectKeys,
    toObjectValue,
    toObjectValues,
    toQuery,
    toRound,
    toString,
    toURL,
    toValue
});