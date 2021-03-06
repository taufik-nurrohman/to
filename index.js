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
const toFixed = (x, base) => isNumber(x) ? x.toFixed(base) : null;
const toFloor = x => isNumber(x) ? Math.floor(x) : x;
const toHTML = x => {
    return x
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
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
const toRound = x => isNumber(x) ? Math.round(x) : null;
const toString = (x, base = 10) => isNumber(x) ? x.toString(base) : "" + x;
const toURL = x => decodeURIComponent(x);
const toValue = x => {
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
    toFixed,
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
    toRound,
    toString,
    toURL,
    toValue
});
