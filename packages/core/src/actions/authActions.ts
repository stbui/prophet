/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_CHECK = 'USER_CHECK';
export const USER_CHECK_SUCCESS = 'USER_CHECK_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_GET_PERMISSIONS = 'AUTH_GET_PERMISSIONS';

export const userLogin = (payload: object) => ({
    type: USER_LOGIN,
    payload,
    meta: { auth: true },
});

export const userCheck = (payload: object) => ({
    type: USER_CHECK,
    payload,
    meta: { auth: true },
});

export const userLogout = (redirectTo?: string) => ({
    type: USER_LOGOUT,
    payload: { redirectTo },
    meta: { auth: true },
});
