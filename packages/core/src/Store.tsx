import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import { rootSaga } from './sideEffect';

export default function configureStore(intialState = {}, history) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [routerMiddleware(history), sagaMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(reducer, compose(...enhancers));

  sagaMiddleware.run(rootSaga);

  return store;
}
