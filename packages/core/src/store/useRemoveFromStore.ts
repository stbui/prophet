/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';

import { useStoreContext } from './useStoreContext';

/**
 *
 * @example
 * import { useRemoveFromStore } from '@prophet/core';
 *
 * const ResetDatagridPrefs = () {
 *    const removeItem = useRemoveFromStore();
 *
 *    const hancleClick = () => {
 *        removeItem('datagrid.prefs');
 *    };
 *
 *    return <Button onClick={hancleClick}>Reset datagrid preferences</Button>;
 * }
 */
export const useRemoveFromStore = (hookTimeKey?: string) => {
    const { removeItem } = useStoreContext();
    return useCallback(
        (key?: string) => {
            if (
                typeof key === 'undefined' &&
                typeof hookTimeKey === 'undefined'
            ) {
                throw new Error(
                    'You must provide a key to remove an item from the store'
                );
            }
            // @ts-ignore
            return removeItem(key ?? hookTimeKey);
        },
        [removeItem, hookTimeKey]
    );
};
