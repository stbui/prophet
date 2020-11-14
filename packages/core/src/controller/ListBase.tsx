// @ts-nocheck
import React from 'react';
import useListController from './useListController';
import ListContextProvider from './ListContextProvider';

/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <ListBase {...props}>list</ListBase>
 */
const ListBase = ({ children, ...props }) => (
    <ListContextProvider value={useListController(props)}>
        {children}
    </ListContextProvider>
);

export default ListBase;
