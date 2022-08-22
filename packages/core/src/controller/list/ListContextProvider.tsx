/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { ListPaginationContext } from './ListPaginationContext';
import { ListSortContext } from './ListSortContext';
import { ListFilterContext } from './ListFilterContext';
import { ListContext } from './ListContext';

/**
 *
 * @param param0
 *
 * @example
 *
 * import { ListContextProvider, useListController, useListContext, useListFilterContext, useListSortContext, useListPaginationContext } from '@stbui/prophet-core';
 *
 * const View = () => {
 *      const { data, ids, filterValues, setFilters } = useListContext();
 *      const { filterValues, setFilters } = useListFilterContext();
 *      const { currenntSort, setSort } = useListSortContext();
 *      const { page, perPage, setPage, setPerPage, total } = useListPaginationContext();
 * }
 *
 * const App = () => {
 *      const controllerProps = useListController(props);
 *      retrun <ListContextProvider value={controllerProps}><View /></ListContextProvider>
 * }
 */
export const ListContextProvider = ({ value, children }) => {
    return (
        <ListContext.Provider value={value}>
            <ListFilterContext.Provider value={value}>
                <ListSortContext.Provider value={value}>
                    <ListPaginationContext.Provider value={value}>
                        {children}
                    </ListPaginationContext.Provider>
                </ListSortContext.Provider>
            </ListFilterContext.Provider>
        </ListContext.Provider>
    );
};
