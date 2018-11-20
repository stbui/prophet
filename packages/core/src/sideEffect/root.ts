import { all } from 'redux-saga/effects';
import fetch from './fetch';

export default dataProvider => {
  return function* rootSaga() {
    console.log('saga root');
    yield all([fetch(dataProvider)()]);
  };
};
