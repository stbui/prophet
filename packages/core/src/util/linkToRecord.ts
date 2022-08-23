/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

export const linkToRecord = (basePath, id, linkType = 'edit') => {
    const link = `${basePath}/${encodeURIComponent(id)}`;

    if (linkType === 'show') {
        return `${link}/show`;
    }

    return link;
};
