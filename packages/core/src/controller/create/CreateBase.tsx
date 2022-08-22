/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import CreateContextProvider from './CreateContextProvider';
import useCreateController from './useCreateController';

/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <CreateBase {...props}>create</CreateBase>
 */
const CreateBase = ({ children, ...props }) => (
    <CreateContextProvider value={useCreateController(props)}>
        {children}
    </CreateContextProvider>
);

export default CreateBase;
