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
 * import { useListController, ListContext, useListContext } from '@stbui/prophet-core';
 *
 * const View = () => {
 *      const {
 *          currentSort,
 *          data,
 *          displayedFilters,
 *          filterValues,
 *          hasCreate,
 *          hideFilter,
 *          ids,
 *          loaded,
 *          loading,
 *          page,
 *          perPage,
 *          setFilters,
 *          setPage,
 *          setPerPage,
 *          setSort,
 *          showFilter,
 *          total
 *      } = useListContext();
 * }
 *
 * const App = () => {
 *      const controllerProps = useListController(props);
 *      retrun <ListContext.Provider value={controllerProps}><View /></ListContext.Provider>
 * }
 */
export const ListContext = createContext({
    basePath: null,
    currentSort: null,
    data: null,
    displayedFilters: null,
    filterValues: null,
    hasCreate: null,
    hideFilter: null,
    ids: null,
    loaded: null,
    loading: null,
    page: null,
    perPage: null,
    resource: null,
    setFilters: null,
    setPage: null,
    setPerPage: null,
    setSort: null,
    showFilter: null,
    total: null,
});

export const useListContext = (props?) => {
    const context = useContext(ListContext);
    return context;
};
