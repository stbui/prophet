/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { ReactNode } from 'react';
import { CreateContextProvider } from './CreateContextProvider';
import { useCreateController } from './useCreateController';

export interface CreateControllerProps {
    record?: any;
    redirect?: any;
    resource?: string;
    mutationOptions?: any;
    transform?: any;
    children: ReactNode;
}
/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <CreateBase {...props}>create</CreateBase>
 */
export const CreateBase = ({ children, ...props }: CreateControllerProps) => (
    <CreateContextProvider value={useCreateController(props)}>
        {children}
    </CreateContextProvider>
);
