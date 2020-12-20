const {isArray, isNumber, isNumeric, isObject} = require('@taufik-nurrohman/is');

const toArray = x => isArray(x) ? x : [x];
const toBoolean = x => !!x;
const toCaseCamel = x => x.replace(/[-_.](\w)/g, (m0, m1) => toCaseUpper(m1));
const toCaseKebab = (x, separator = '-') => x.replace(/[A-Z]/g, m0 => separator + toCaseLower(m0)).replace(/\W+/g, separator);
const toCaseLower = x => x.toLowerCase();
const toCasePascal = x => x.replace(/(?:^|[-_.])(\w)/g, (m0, m1) => toCaseUpper(m1));
const toCaseUpper = x => x.toUpperCase();
const toCeil = x => isNumber(x) ? Math.ceil(x) : null;
const toFixed = (x, base) => isNumber(x) ? x.toFixed(base) : null;
const toFloor = x => isNumber(x) ? Math.floor(x) : x;
const toHTML = x => {
    return x
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
};
const toJSON = x => JSON.stringify(x);
const toNumber = (x, base = 10) => parseInt(x, base);
const toRound = x => isNumber(x) ? Math.round(x) : null;
const toString = (x, base = 10) => x && 'toString' in x ? x.toString(base) : "" + x;
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
    return ({
        'false': false,
        'null': null,
        'true': true
    })[x] || x;
};

Object.assign(exports || {}, {
    toArray,
    toBoolean,
    toCaseCamel,
    toCaseKebab,
    toCaseLower,
    toCasePascal,
    toCaseUpper,
    toCeil,
    toFixed,
    toFloor,
    toHTML,
    toJSON,
    toNumber,
    toRound,
    toString,
    toString,
    toURL,
    toValue
});
