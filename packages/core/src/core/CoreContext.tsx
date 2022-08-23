/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { ReactNode, useMemo } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { createHashHistory } from 'history';

import {
    DataProviderContext,
    defaultDataProvider,
    DataProvider,
} from '../dataProvider';
import { AuthProviderContext } from '../auth';
import { TranslationProvider } from '../i18n';
import { StoreContextProvider, memoryStore, Store } from '../store';
import { NotificationContextProvider } from '../notification';
import { AuthProvider, I18nProvider } from '../types';

interface CoreContextProps {
    authProvider?: AuthProvider;
    dataProvider: DataProvider;
    i18nProvider?: I18nProvider;
    children?: ReactNode;
    store?: Store;
    queryClient?: QueryClient;
}

export const CoreContext = ({
    children,
    authProvider,
    dataProvider,
    i18nProvider,
    store,
    queryClient,
}: CoreContextProps) => {
    const finalQueryClient = useMemo(() => queryClient || new QueryClient(), [
        queryClient,
    ]);

    return (
        <AuthProviderContext.Provider value={authProvider}>
            <DataProviderContext.Provider value={dataProvider}>
                <StoreContextProvider value={store}>
                    <QueryClientProvider client={finalQueryClient}>
                        <TranslationProvider i18nProvider={i18nProvider}>
                            <NotificationContextProvider>
                                {children}
                            </NotificationContextProvider>
                        </TranslationProvider>
                    </QueryClientProvider>
                </StoreContextProvider>
            </DataProviderContext.Provider>
        </AuthProviderContext.Provider>
    );
};

CoreContext.defaultProps = {
    dataProvider: defaultDataProvider,
    store: memoryStore(),
};
