import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import rootReducer from './reducers';
import { rootSaga } from './sideEffect';

export default function configureStore({
  intialState = {},
  history,
  dataProvider
}) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(rootReducer, intialState, compose(...enhancers));

  const saga = function* Saga() {
    yield all([rootSaga(dataProvider)].map(fork));
  };

  sagaMiddleware.run(saga);

  return store;
}
