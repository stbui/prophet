/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import rootReducer from './reducers';
import { rootSaga } from './sideEffect';

export default function configureStore({
  initialState,
  history,
  dataProvider,
  authProvider,
  customSagas = []
}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducer, initialState, compose(...enhancers));

  const saga = function* Saga() {
    yield all([rootSaga(dataProvider, authProvider), ...customSagas].map(fork));
  };

  sagaMiddleware.run(saga);

  return store;
}
