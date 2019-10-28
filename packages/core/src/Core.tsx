/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { FunctionComponent, ComponentType } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import configureStore from './Store';
import Router from './Router';
import { DataProviderContext } from './dataProvider';
import { AuthProviderContext } from './auth';
import { TranslationProvider } from './i18n';

interface CoreProps {
    dashboard: ComponentType;
    menu: ComponentType;
    brand: ComponentType;
    login: ComponentType;
    layout: ComponentType;
    catchAll: ComponentType;
    initialState: any;
    authProvider: any;
    dataProvider: any;
    i18nProvider: any;
    customRoutes: any;
    customSagas: any;
    customReducers: any;
    history: any;
}

export const Core: FunctionComponent<CoreProps> = props => {
    const {
        children,
        dashboard,
        menu,
        brand,
        login,
        layout,
        catchAll,
        initialState,
        authProvider,
        dataProvider,
        i18nProvider,
        customRoutes = [],
        customSagas,
        customReducers,
        history,
    } = props;

    const _history = history || createHashHistory();

    return (
        <AuthProviderContext.Provider value={authProvider}>
            <Provider
                store={configureStore({
                    initialState,
                    history: _history,
                    dataProvider,
                    authProvider,
                    customSagas,
                    customReducers,
                })}
            >
                <DataProviderContext.Provider value={dataProvider}>
                    <TranslationProvider i18nProvider={i18nProvider}>
                        <ConnectedRouter history={_history}>
                            <Switch>
                                <Route exact path="/login" component={login} />
                                <Route
                                    path="/"
                                    render={props => (
                                        <Router
                                            Layout={layout}
                                            dashboard={dashboard}
                                            customRoutes={customRoutes}
                                            catchAll={catchAll}
                                            menu={menu}
                                            brand={brand}
                                            {...props}
                                        >
                                            {children}
                                        </Router>
                                    )}
                                />
                            </Switch>
                        </ConnectedRouter>
                    </TranslationProvider>
                </DataProviderContext.Provider>
            </Provider>
        </AuthProviderContext.Provider>
    );
};

Core.defaultProps = {
    catchAll: () => null,
    history: createHashHistory(),
};

export default Core;
