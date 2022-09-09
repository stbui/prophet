/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useMemo, createContext, useContext } from 'react';
import defaults from 'lodash/defaults';

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
    sort: null,
    data: null,
    defaultTitle: null,
    displayedFilters: null,
    exporter: null,
    filterValues: null,
    hasNextPage: null,
    hasPreviousPage: null,
    hideFilter: null,
    isFetching: null,
    isLoading: null,
    onSelect: null,
    onToggleItem: null,
    onUnselectItems: null,
    page: null,
    perPage: null,
    refetch: null,
    resource: null,
    selectedIds: undefined,
    setFilters: null,
    setPage: null,
    setPerPage: null,
    setSort: null,
    showFilter: null,
    total: null,
});

const extractListContextProps = ({
    sort,
    data,
    defaultTitle,
    displayedFilters,
    exporter,
    filterValues,
    hasCreate,
    hideFilter,
    isFetching,
    isLoading,
    onSelect,
    onToggleItem,
    onUnselectItems,
    page,
    perPage,
    refetch,
    resource,
    selectedIds,
    setFilters,
    setPage,
    setPerPage,
    setSort,
    showFilter,
    total,
}) => ({
    sort,
    data,
    defaultTitle,
    displayedFilters,
    exporter,
    filterValues,
    hasCreate,
    hideFilter,
    isFetching,
    isLoading,
    onSelect,
    onToggleItem,
    onUnselectItems,
    page,
    perPage,
    refetch,
    resource,
    selectedIds,
    setFilters,
    setPage,
    setPerPage,
    setSort,
    showFilter,
    total,
});

export const useListContext = (props?) => {
    const context = useContext(ListContext);
    return useMemo(
        () =>
            defaults(
                {},
                props != null ? extractListContextProps(props) : {},
                context
            ),
        [context, props]
    );
};
