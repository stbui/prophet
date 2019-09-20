import { all, takeEvery, put, call } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import {
    USER_LOGIN,
    USER_CHECK,
    USER_LOGIN_FAILURE,
    USER_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../actions';
import { AUTH_LOGIN, AUTH_CHECK, AUTH_ERROR, AUTH_LOGOUT } from '../actions';

export function* handleAuth(authProvider: any, action: any) {
    const { type, payload, error, meta } = action;

    switch (type) {
        case USER_LOGIN:
            try {
                yield put({ type: USER_LOGIN_LOADING });

                const authPayload = yield call(
                    authProvider,
                    AUTH_LOGIN,
                    payload
                );
                yield put({
                    type: USER_LOGIN_SUCCESS,
                    payload: authPayload,
                });

                const redirectTo = yield meta.pathName || '/';
                yield put(push(redirectTo));
            } catch (error) {
                yield put({
                    type: USER_LOGIN_FAILURE,
                    error: error,
                    meta: { auth: true },
                });
            }
            break;
        case USER_CHECK:
            try {
                yield call(authProvider, AUTH_CHECK, payload);
            } catch (error) {
                yield call(authProvider, AUTH_LOGOUT);
                const redirectTo = replace({
                    pathname: (error && error.redirectTo) || '/login',
                    state: { nextPathName: meta.pathName },
                });
                yield put(redirectTo);
            }
            break;
        case USER_LOGOUT:
            yield call(authProvider, AUTH_LOGOUT);
            const redirectTo = push(
                (payload && payload.redirectTo) || '/login'
            );
            yield put(redirectTo);
            break;
    }
}

const takeAuthAction = action => action.meta && action.meta.auth;

export default authProvider => {
    if (!authProvider) {
        return () => null;
    }

    return function* watchAuth() {
        yield all([takeEvery(takeAuthAction, handleAuth, authProvider)]);
    };
};
