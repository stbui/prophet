/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

const deleteKey = (target, path) =>
    Object.keys(target).reduce((acc, key) => {
        if (key !== path) {
            return Object.assign({}, acc, { [key]: target[key] });
        }

        return acc;
    }, {});

export const removeKey = (target, path) => {
    const paths = path.split('.');

    if (paths.length === 1) {
        return deleteKey(target, path);
    }

    const deepKey = paths[0];
    if (target[deepKey] === undefined) {
        return target;
    }
    const deep = removeKey(target[deepKey], paths.slice(1).join('.'));

    if (Object.keys(deep).length === 0) {
        return deleteKey(target, deepKey);
    }

    return Object.assign({}, target, { [deepKey]: deep });
};
