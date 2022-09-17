/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext, useContext } from 'react';

/**
 *
 * @example
 *
 * import { useListController, ListSortContext, useListSortContext } from '@stbui/prophet-core';
 *
 * const View = () => {
 *      const { currenntSort, setSort } = useListSortContext();
 * }
 *
 * const App = () => {
 *      const controllerProps = useListController(props);
 *      retrun <ListSortContext.Provider value={controllerProps}><View /></ListSortContext.Provider>
 * }
 */
export const ListSortContext = createContext({
    sort: null,
    setSort: null,
    resource: null,
});

/**
 *
 * @example
 *
 * const { currenntSort, setSort } = useListSortContext();
 */
export const useListSortContext = () => {
    const context = useContext(ListSortContext);

    return context;
};
