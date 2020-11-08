/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import {
    all,
    takeEvery,
    put,
    call,
    takeLatest,
    select,
} from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import {
    USER_LOGIN,
    USER_CHECK,
    USER_LOGOUT,
    FETCH_ERROR,
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    showNotification,
    hideNotification,
    clearState,
} from '../actions';
import { AuthProvider } from '../types';

const nextPathnameSelector = state => {
    const locationState = state.router.location.state;
    return locationState && locationState.nextPathname;
};

const getErrorMessage = (error, defaultMessage) =>
    typeof error === 'string'
        ? error
        : typeof error === 'undefined' || !error.message
        ? defaultMessage
        : error.message;

const currentPathnameSelector = state => state.router.location;

const handleLogin = (authProvider: AuthProvider) =>
    function* (action) {
        const { payload, meta } = action;
        try {
            yield put({ type: USER_LOGIN_LOADING });
            const authPayload = yield call([authProvider, 'login'], payload);
            yield put({
                type: USER_LOGIN_SUCCESS,
                payload: authPayload,
            });
            const redirectTo = yield meta.pathName ||
                select(nextPathnameSelector);
            yield put(push(redirectTo || '/'));
        } catch (error) {
            yield put({
                type: USER_LOGIN_FAILURE,
                error: error,
                meta: { auth: true },
            });
            const errorMessage = getErrorMessage(
                error,
                'prophet.auth.sign_in_error'
            );
            yield put(showNotification(errorMessage, 'warning'));
        }
    };

const handleCheck = (authProvider: AuthProvider) =>
    function* (action) {
        const { payload, meta } = action;
        try {
            yield call([authProvider, 'checkAuth'], payload);
        } catch (error) {
            const redirectTo = yield call([authProvider, 'logout'], undefined);
            yield put(
                replace({
                    pathname:
                        (error && error.redirectTo) || redirectTo || '/login',
                    state: { nextPathname: meta.pathName },
                })
            );
            yield put(clearState());
            const errorMessage = getErrorMessage(
                error,
                'ra.auth.auth_check_error'
            );
            yield put(showNotification(errorMessage, 'warning'));
        }
    };

const handleLogout = (authProvider: AuthProvider) =>
    function* (action) {
        const { payload } = action;
        const redirectTo = yield call([authProvider, 'logout'], undefined);
        yield put(
            push((payload && payload.redirectTo) || redirectTo || '/login')
        );
        yield put(clearState());
    };

const handleFetchError = (authProvider: AuthProvider) =>
    function* (action) {
        const { error } = action;
        try {
            yield call([authProvider, 'checkError'], error);
        } catch (e) {
            const nextPathname = yield select(currentPathnameSelector);
            const redirectTo = yield call([authProvider, 'logout'], undefined);
            yield put(
                push({
                    pathname: redirectTo || '/login',
                    state: { nextPathname },
                })
            );
            yield put(clearState());
            yield put(hideNotification());
            yield put(
                showNotification('prophet.notification.logged_out', 'warning')
            );
        }
    };

export default (authProvider?: AuthProvider) => {
    if (!authProvider) {
        return () => null;
    }

    return function* watchAuthActions() {
        yield all([
            takeEvery(USER_LOGIN, handleLogin(authProvider)),
            takeEvery(USER_CHECK, handleCheck(authProvider)),
            takeEvery(USER_LOGOUT, handleLogout(authProvider)),
            takeLatest(FETCH_ERROR, handleFetchError(authProvider)),
        ]);
    };
};
