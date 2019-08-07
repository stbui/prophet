/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import configureStore from './Store';
import Router from './Router';
import DataProviderContext from './dataProvider/dataProviderContext';

const history = createHashHistory();

export interface PropsType {
    dashboard?: React.ComponentType;
    catchAll?: React.ComponentType;
    menu?: React.ComponentType;
    brand?: React.ComponentType;
    dataProvider?: (type?: any, resource?: any, params?: any) => Promise<any>;
    authProvider?: (type: any, params?: any) => Promise<any>;
    customSagas?: any[];
    initialState?: object;
    customRoutes?: any[];
    login?: React.ComponentType;
    layout?: React.ComponentType;
}

export const Core = props => {
    const {
        children,
        dashboard,
        customRoutes = [],
        catchAll,
        menu,
        dataProvider,
        brand,
        login,
        layout,
        authProvider,
        initialState,
        customSagas,
    } = props;

    return (
        <Provider
            store={configureStore({
                initialState,
                history,
                dataProvider,
                authProvider,
                customSagas,
            })}
        >
            <DataProviderContext.Provider value={dataProvider}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="login" component={login} />
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
            </DataProviderContext.Provider>
        </Provider>
    );
};

export default Core;
