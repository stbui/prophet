/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import linkToRecord from './linkToRecord';

/**
 *
 * @param redirectTo
 * @param basePath
 * @param id
 *
 * resolveRedirectTo(
 *  (basePath, id, data) => {
 *       return `${basePath}/${id}?filter=${data}`;
 *   },
 *   'basePath',
 *   'id',
 *   'data'
 * );
 */
const resolveRedirectTo = (
    redirectTo: string | Function,
    basePath: string,
    id?: any,
    data?: any
) => {
    if (typeof redirectTo === 'function') {
        return redirectTo(basePath, id, data);
    }

    switch (redirectTo) {
        case 'list':
            return basePath;
        case 'create':
            return `${basePath}/create`;
        case 'edit':
            return linkToRecord(basePath, id);
        case 'show':
            return `${linkToRecord(basePath, id)}/show`;
        default:
            return redirectTo;
    }
};

export default resolveRedirectTo;
