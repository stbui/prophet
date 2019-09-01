function keys(obj) {
    const keyList = [];
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            keyList.push(k);
        }
    }
    return keyList;
}

function equalArrays(value: any[], other: [], enhancer: any) {
    if (value.length !== other.length) {
        return false;
    }

    for (let i = 0; i < value.length; i++) {
        if (!isEqual(value[i], other[i], enhancer)) {
            return false;
        }
    }

    return true;
}

function equalObject(value: object, other: object, enhancer: any) {
    const vKeys = keys(value);
    const oKeys = keys(other);

    if (vKeys.length !== oKeys.length) {
        return false;
    }

    for (let i = 0; i < vKeys.length; i++) {
        const v = value[vKeys[i]];
        const o = other[vKeys[i]];
        if (!isEqual(v, o, enhancer)) {
            return false;
        }
    }

    return true;
}

/**
 * isEqual([1], [1]); // true
 * isEqual({ a: 1 }, { a: 1 }); // true
 * isEqual(undefined, undefined); // true
 * isEqual(null, null); // true
 * isEqual(undefined, []); // false
 * isEqual(undefined, null); // false
 * isEqual([], { a: 1 }); // false
 */

export function isEqual(value: any, other: any, enhancer?: any) {
    // 全等
    if (value === other) {
        // 这里为了区别 +0 和 -0, 因为 1 / -0 = -Infinite, 1 / +0 = +Infinite
        return value !== 0 || 1 / value === 1 / other;
    }

    // 类型不同
    const vtype = Object.prototype.toString.call(value);
    const otype = Object.prototype.toString.call(other);

    if (vtype !== otype) {
        return false;
    }

    // NaN
    if (value !== value && other !== other) {
        return true;
    }

    if (vtype === '[object Array]') {
        return equalArrays(value, other, enhancer);
    }

    if (vtype === '[object Object]') {
        return equalObject(value, other, enhancer);
    }

    return value === other;
}
