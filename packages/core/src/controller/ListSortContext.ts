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
    currenntSort: null,
    setSort: null,
    resource: null,
});

export const useListSortContext = () => {
    const context = useContext(ListSortContext);

    return context;
};
