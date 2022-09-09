/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { ReactNode, useMemo } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import {
    DataProviderContext,
    defaultDataProvider,
    DataProvider,
} from '../dataProvider';

import { StoreContextProvider, memoryStore, Store } from '../store';
import { NotificationContextProvider } from '../notification';
import { AuthProvider, I18nProvider } from '../types';
import { ResourceDefinitionContextProvider } from './ResourceDefinitionContext';
import { Router } from '../routing';
import { AuthProviderContext } from '../auth';

interface CoreContextProps {
    authProvider?: AuthProvider;
    dataProvider: DataProvider;
    i18nProvider?: I18nProvider;
    children?: ReactNode;
    store: Store;
    queryClient?: QueryClient;
    basename?: string;
}

export const CoreContext = ({
    children,
    authProvider,
    dataProvider,
    i18nProvider,
    store,
    queryClient,
    basename,
}: CoreContextProps) => {
    const finalQueryClient = useMemo(
        () => queryClient || new QueryClient(),
        [queryClient]
    );

    return (
        <DataProviderContext.Provider value={dataProvider}>
            <StoreContextProvider value={store}>
                <QueryClientProvider client={finalQueryClient}>
                    <Router basename={basename}>
                        <NotificationContextProvider>
                            <ResourceDefinitionContextProvider>
                                {children}
                            </ResourceDefinitionContextProvider>
                        </NotificationContextProvider>
                    </Router>
                </QueryClientProvider>
            </StoreContextProvider>
        </DataProviderContext.Provider>
    );
};

CoreContext.defaultProps = {
    dataProvider: defaultDataProvider,
    store: memoryStore(),
};
