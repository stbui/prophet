/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { all } from 'redux-saga/effects';
import fetch from './fetch';
import notification from './notification';
import auth from './auth';
import refresh from './refresh';

export default (dataProvider, authProvider) => {
  return function* rootSaga() {
    yield all([fetch(dataProvider)(), auth(authProvider)(), notification(), refresh()]);
  };
};
