/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

/**
 *
 * @example
 *
 * const refresh = useRefresh();
 * const handleClick = () => {
 *     refresh();
 * };
 */
export const useRefresh = () => {
    const queryClient = useQueryClient();
    return useCallback(() => {
        queryClient.invalidateQueries();
    }, [queryClient]);
};
