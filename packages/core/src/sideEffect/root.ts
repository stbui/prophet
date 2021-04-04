/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { all } from 'redux-saga/effects';
import notification from './notification';
import refresh from './refresh';

export default (dataProvider, authProvider) => {
    return function* rootSaga() {
        yield all([notification(), refresh()]);
    };
};
