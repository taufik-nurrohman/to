import {
    isArray,
    isNumeric,
    isObject
} from '@taufik-nurrohman/is';

export const toBoolean = x => !!x;
export const toHTML = x => {
    return x
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
};
export const toJSON = x => JSON.parse(x);
export const toNumber = x => +x;
export const toReal = x => {
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
export const toString = x => {
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
export const toURL = x => decodeURIComponent(x);
