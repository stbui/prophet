import { createContext, useContext } from 'react';

/**
 *
 * @example
 *
 * import { useListController, ListPaginationContext, useListPaginationContext } from '@stbui/prophet-core';
 *
 * const View = () => {
 *      const { page, perPage, setPage, setPerPage, total } = useListPaginationContext();
 * }
 *
 * const App = () => {
 *      const controllerProps = useListController(props);
 *      retrun <ListPaginationContext.Provider value={controllerProps}><View /></ListPaginationContext.Provider>
 * }
 */
export const ListPaginationContext = createContext({
    loading: null,
    page: null,
    perPage: null,
    setPage: null,
    setPerPage: null,
    total: null,
    resource: null,
});

export const useListPaginationContext = () => {
    const context = useContext(ListPaginationContext);

    return context;
};
