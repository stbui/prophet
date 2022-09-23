/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { ReactNode } from 'react';
import { EditContextProvider } from './EditContextProvider';
import { useEditController, EditProps } from './useEditController';

/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <EditBase {...props}>edit</EditBase>
 */
export const EditBase = ({
    children,
    ...props
}: EditProps & { children: ReactNode }) => (
    <EditContextProvider value={useEditController(props)}>
        {children}
    </EditContextProvider>
);
