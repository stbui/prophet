/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { FunctionComponent, ComponentType } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import configureStore from './Store';
import Router from './Router';
import { DataProviderContext } from './dataProvider';
import { AuthProviderContext } from './auth';
import { TranslationProviderContext } from './i18n';

const history = createHashHistory();

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
    } = props;

    return (
        <AuthProviderContext.Provider value={authProvider}>
            <Provider
                store={configureStore({
                    initialState,
                    history,
                    dataProvider,
                    authProvider,
                    customSagas,
                    customReducers,
                })}
            >
                <DataProviderContext.Provider value={dataProvider}>
                    <TranslationProviderContext.Provider value={i18nProvider}>
                        <ConnectedRouter history={history}>
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
                    </TranslationProviderContext.Provider>
                </DataProviderContext.Provider>
            </Provider>
        </AuthProviderContext.Provider>
    );
};

Core.defaultProps = {
    catchAll: () => null,
};

export default Core;
