/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import rootReducer from '../reducers';
import { rootSaga } from '../sideEffect';

import { AuthProvider, I18nProvider } from '../types';

interface ConfigStore {
    dataProvider: any;
    history: any;
    authProvider?: AuthProvider | null;
    customReducers?: any;
    customSagas?: any[];
    i18nProvider?: I18nProvider;
    initialState?: any;
    locale?: string;
}

export default function CoreConfigStore({
    initialState,
    history,
    dataProvider,
    authProvider = null,
    customSagas = [],
    customReducers = {},
}: ConfigStore) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [routerMiddleware(history), sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const store: any = createStore(
        rootReducer(history, customReducers),
        initialState,
        compose(...enhancers)
    );

    const saga = function* Saga() {
        yield all(
            [rootSaga(dataProvider, authProvider), ...customSagas].map(fork)
        );
    };

    sagaMiddleware.run(saga);

    return store;
}
