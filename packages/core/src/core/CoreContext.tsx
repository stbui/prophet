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
import { I18nContextProvider } from '../i18n';
import { AuthContext } from '../auth';

interface CoreContextProps {
    authProvider: AuthProvider;
    dataProvider: DataProvider;
    i18nProvider: I18nProvider;
    store: Store;
    children: ReactNode;
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
                        <I18nContextProvider value={i18nProvider}>
                            <NotificationContextProvider>
                                <ResourceDefinitionContextProvider>
                                    {children}
                                </ResourceDefinitionContextProvider>
                            </NotificationContextProvider>
                        </I18nContextProvider>
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
