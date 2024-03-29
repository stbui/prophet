/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

// @ts-nocheck
import React from 'react';
import { ShowContextProvider } from './ShowContextProvider';
import { useShowController } from './useShowController';
import { ResourceContextProvider } from '../../core';

/**
 *
 * @param param0
 *
 * @example
 *
 * const App = (props) => <ShowBase {...props}>show</ShowBase>
 */
export const ShowBase = ({ children, ...props }) => (
    <ResourceContextProvider value={props.resource}>
        <ShowContextProvider value={useShowController(props)}>
            {children}
        </ShowContextProvider>
    </ResourceContextProvider>
);
