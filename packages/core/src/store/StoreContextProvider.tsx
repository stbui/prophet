/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import { useEffect } from 'react';
import { StoreContext } from './StoreContext';
import { Store } from './types';

export const StoreContextProvider = ({
    value: Store,
    children,
}: StoreContextProviderProps) => {
    useEffect(() => {
        Store.setup();
        return () => {
            Store.teardown();
        };
    }, [Store]);

    return (
        <StoreContext.Provider value={Store}>{children}</StoreContext.Provider>
    );
};

export interface StoreContextProviderProps {
    value: Store;
    children: React.ReactNode;
}
