// @ts-nocheck
import React from 'react';
import EditContextProvider from './EditContextProvider';
import useEditController from './useEditController';

/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <EditBase {...props}>edit</EditBase>
 */
const EditBase = ({ children, ...props }) => (
    <EditContextProvider value={useEditController(props)}>
        {children}
    </EditContextProvider>
);

export default EditBase;
