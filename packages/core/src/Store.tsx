import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import reducer from './reducers';

function r(state = 0, action) {
  return state;
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(r, applyMiddleware(sagaMiddleware));
const saga = function* rootSaga() {
  yield all([].map(fork));
};

sagaMiddleware.run(saga);

export default store;
