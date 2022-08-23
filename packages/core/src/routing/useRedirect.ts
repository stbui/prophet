/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useNavigate, To } from 'react-router-dom';
import { parsePath } from 'history';

import { useBasename } from './useBasename';
import { useCreatePath } from './useCreatePath';

type RedirectToFunction = (
    resource?: string,
    id?: string | number,
    data?: Partial<any>,
    state?: object
) => To;

export type RedirectionSideEffect = string | false | RedirectToFunction;

/**
 *
 * @example
 *
 * const redirect = useRedirect();
 * redirect('list', 'posts');
 * redirect('edit', 'posts', 123);
 * redirect('edit', 'comments', 123, {}, { record: { post_id: record.id } });
 * redirect(false);
 * redirect((resource, id, data) => ...)
 */
export const useRedirect = () => {
    const navigate = useNavigate();
    const basename = useBasename();
    const createPath = useCreatePath();

    return useCallback(
        (
            redirectTo: RedirectionSideEffect,
            resource: string = '',
            id?: string | number,
            data?: Partial<any>,
            state: object = {}
        ) => {
            if (!redirectTo) {
                return;
            } else if (typeof redirectTo === 'function') {
                const target: To = redirectTo(resource, id, data);
                const absoluteTarget =
                    typeof target === 'string'
                        ? `${basename}/${target}`
                        : {
                              pathname: `${basename}/${target.pathname}`,
                              ...target,
                          };
                navigate(
                    typeof absoluteTarget === 'string'
                        ? parsePath(absoluteTarget)
                        : absoluteTarget,
                    {
                        state: { _scrollToTop: true, ...state },
                    }
                );
                return;
            } else if (
                typeof redirectTo === 'string' &&
                redirectTo.startsWith('http') &&
                window
            ) {
                window.location.href = redirectTo;
                return;
            } else {
                navigate(createPath({ resource, id, type: redirectTo }), {
                    state: { _scrollToTop: true, ...state },
                });
                return;
            }
        },
        [navigate, basename, createPath]
    );
};
