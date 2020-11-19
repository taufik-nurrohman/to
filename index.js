// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const {
        isArray,
        isNumber,
        isNumeric,
        isObject
    } = require('@taufik-nurrohman/is');
    const toArray = x => isArray(x) ? x : [x];
    const toBoolean = x => !!x;
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
export const toRound = x => isNumber(x) ? Math.round(x) : null;
    const toString = (x, base = 10) => x && 'toString' in x ? x.toString(base) : "" + x;
    const toURL = x => decodeURIComponent(x);
    const toValue = x => {
        if (isArray(x)) {
            return x.map(v => toValue(v));
        }
        if (isNumeric(x)) {
            return toNumber(x);
        }
        if (isObject(x, true)) {
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
    $$.toBoolean = toBoolean;
    $$.toCeil = toCeil;
    $$.toFixed = toFixed;
    $$.toFloor = toFloor;
    $$.toHTML = toHTML;
    $$.toJSON = toJSON;
    $$.toNumber = toNumber;
    $$.toRound = toRound;
    $$.toString = toString;
    $$.toURL = toURL;
    $$.toValue = toValue;
})(exports || window || {});
