/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useBasename } from './useBasename';

/**
 * @example
 * import { useCreatePath, useRecordContext } from '@prophet/core';
 * import { useNavigate } from 'react-router-dom';
 *
 * const PostEditButton = () => {
 *     const createPath = useCreatePath();
 *     const record = useRecordContext();
 *     const navigate = useNavigate();
 *
 *     const handleClick = () => {
 *         const link = createPath({
 *            type: 'edit',
 *            resource: 'posts',
 *            id: record.id
 *         });
 *         navigate(link);
 *     };
 *
 *    return <button onClick={handleClick}>Edit Post</button>;
 * };
 */
export const useCreatePath = () => {
    const basename = useBasename();
    return useCallback(
        ({ resource, id, type }: CreatePathParams): string => {
            switch (type) {
                case 'list':
                    return removeDoubleSlashes(`${basename}/${resource}`);
                case 'create':
                    return removeDoubleSlashes(
                        `${basename}/${resource}/create`
                    );
                case 'edit': {
                    if (id == null) {
                        return removeDoubleSlashes(`${basename}/${resource}`);
                    }
                    return removeDoubleSlashes(
                        `${basename}/${resource}/${encodeURIComponent(id)}`
                    );
                }
                case 'show': {
                    if (id == null) {
                        return removeDoubleSlashes(`${basename}/${resource}`);
                    }
                    return removeDoubleSlashes(
                        `${basename}/${resource}/${encodeURIComponent(id)}/show`
                    );
                }
                default:
                    return type;
            }
        },
        [basename]
    );
};

export interface CreatePathParams {
    type: string;
    resource: string;
    id?: any;
}

export const removeDoubleSlashes = (path: string) => path.replace('//', '/');
