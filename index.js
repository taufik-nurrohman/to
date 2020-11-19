// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const {
        isArray,
        isNumeric,
        isObject
    } = require('@taufik-nurrohman/is');
    const toArray = x => isArray(x) ? x : [x];
    const toBoolean = x => !!x;
    const toHTML = x => {
        return x
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
    };
    const toJSON = x => JSON.stringify(x);
    const toNumber = (x, base = 10) => parseInt(x, base);
    const toString = x => {
        if (isArray(x)) {
            return x.map(v => toString(x));
        }
        if (isObject(x, true)) {
            for (let k in x) {
                x[k] = toString(x[k]);
            }
            return x;
        }
        if (false === x) {
            return 'false';
        }
        if (null === x) {
            return 'null';
        }
        if (true === x) {
            return 'true';
        }
        return x + "";
    };
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
    $$.toHTML = toHTML;
    $$.toJSON = toJSON;
    $$.toNumber = toNumber;
    $$.toString = toString;
    $$.toURL = toURL;
    $$.toValue = toValue;
})(exports || window || {});
