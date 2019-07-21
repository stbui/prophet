export const isEqual = (a: any, b: any) => {
    let p, t;
    for (p in a) {
        if (typeof b[p] === 'undefined') {
            return false;
        }
        if (b[p] && !a[p]) {
            return false;
        }
        t = typeof a[p];
        if (t === 'object' && !isEqual(a[p], b[p])) {
            return false;
        }
        if (
            t === 'function' &&
            (typeof b[p] === 'undefined' || a[p].toString() !== b[p].toString())
        ) {
            return false;
        }
        if (a[p] !== b[p]) {
            return false;
        }
    }
    for (p in b) {
        if (typeof a[p] === 'undefined') {
            return false;
        }
    }
    return true;
};
