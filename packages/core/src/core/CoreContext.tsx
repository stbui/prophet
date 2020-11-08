/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { FunctionComponent, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import { DataProviderContext } from '../dataProvider';
import { AuthProviderContext } from '../auth';
import { TranslationProvider } from '../i18n';
import CoreConfigStore from './CoreConfigStore';
import { AuthProvider, I18nProvider } from '../types';

interface CoreContextProps {
    initialState?: object;
    authProvider?: any;
    dataProvider: any;
    i18nProvider?: I18nProvider;
    customSagas?: any[];
    customReducers?: object;
    history?: any;
    children?: ReactNode;
}

const CoreContext: FunctionComponent<CoreContextProps> = ({
    children,
    initialState,
    authProvider,
    dataProvider,
    i18nProvider,
    customSagas,
    customReducers,
    history,
}) => {
    const _history = history || createHashHistory();

    return (
        <Provider
            store={CoreConfigStore({
                initialState,
                history: _history,
                dataProvider,
                authProvider,
                customSagas,
                customReducers,
            })}
        >
            <AuthProviderContext.Provider value={authProvider}>
                <DataProviderContext.Provider value={dataProvider}>
                    <TranslationProvider i18nProvider={i18nProvider}>
                        <ConnectedRouter history={_history}>
                            {children}
                        </ConnectedRouter>
                    </TranslationProvider>
                </DataProviderContext.Provider>
            </AuthProviderContext.Provider>
        </Provider>
    );
};

export default CoreContext;
