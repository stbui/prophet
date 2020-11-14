// @ts-nocheck
import React from 'react';
import ShowContextProvider from './ShowContextProvider';
import useShowController from './useShowController';

/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <ShowBase {...props}>show</ShowBase>
 */
const ShowBase = ({ children, ...props }) => (
    <ShowContextProvider value={useShowController(props)}>
        {children}
    </ShowContextProvider>
);

export default ShowBase;
