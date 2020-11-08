/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { call, takeEvery } from 'redux-saga/effects';

function* handleCallback({
    payload,
    requestPayload,
    error,
    meta: { callback },
}: any) {
    yield call(callback, { payload, requestPayload, error });
}

export const takeCallbackActions = action =>
    action.meta && action.meta.callback;

export default function* () {
    yield takeEvery(takeCallbackActions, handleCallback);
}
