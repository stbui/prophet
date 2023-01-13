/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { ReactNode } from 'react';
import { CreateContextProvider } from './CreateContextProvider';
import {
    useCreateController,
    CreateControllerProps,
} from './useCreateController';
import { ResourceContextProvider } from '../../core';

/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <CreateBase {...props}>create</CreateBase>
 */
export const CreateBase = ({
    children,
    ...props
}: CreateControllerProps & { children: ReactNode }) => (
    <ResourceContextProvider value={props.resource}>
        <CreateContextProvider value={useCreateController(props)}>
            {children}
        </CreateContextProvider>
    </ResourceContextProvider>
);
