import { createContext, useContext } from 'react';

/**
 *
 * @example
 *
 * import { useListController, ListFilterContext, useListFilterContext } from '@stbui/prophet-core';
 *
 * const View = () => {
 *      const { filterValues, setFilters } = useListFilterContext();
 * }
 *
 * const App = () => {
 *      const controllerProps = useListController(props);
 *      retrun <ListFilterContext.Provider value={controllerProps}><View /></ListFilterContext.Provider>
 * }
 */
export const ListFilterContext = createContext({
    displayedFilters: null,
    filtersValue: null,
    hideFilter: null,
    setFilters: null,
    showFilter: null,
    resource: null,
});

export const useListFilterContext = () => {
    const context = useContext(ListFilterContext);

    return context;
};
