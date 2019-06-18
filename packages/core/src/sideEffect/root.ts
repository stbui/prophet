/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { all } from 'redux-saga/effects';
import fetch from './fetch';
import notification from './notification';

export default dataProvider => {
  return function* rootSaga() {
    console.log('saga root');
    yield all([fetch(dataProvider)(), notification()]);
  };
};
