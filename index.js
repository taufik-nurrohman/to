// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const {
        isArray,
        isNumeric,
        isObject
    } = require('@taufik-nurrohman/is');
    const toBoolean = x => !!x;
    const toHTML = x => {
        return x
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');
    };
    const toJSON = x => JSON.parse(x);
    const toNumber = x => +x;
    const toReal = x => {
        if (isArray(x)) {
            return x.map(v => toReal(v));
        }
        if (isNumeric(x)) {
            return toNumber(x);
        }
        if (isObject(x, true)) {
            for (let k in x) {
                x[k] = toReal(x[k]);
            }
            return x;
        }
        return ({
            'false': false,
            'null': null,
            'true': true
        })[x] || x;
    };
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
    $$.toBoolean = toBoolean;
    $$.toHTML = toHTML;
    $$.toJSON = toJSON;
    $$.toNumber = toNumber;
    $$.toReal = toReal;
    $$.toString = toString;
    $$.toURL = toURL;
})(exports || window || {});
