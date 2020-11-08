/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

export const FETCH_START = 'FETCH_START';
export const FETCH_END = 'FETCH_END';
export const FETCH_ERROR = 'FETCH_ERROR';
export const FETCH_CANCEL = 'FETCH_CANCEL';

export interface FetchStartAction {
    readonly type: typeof FETCH_START;
}

export interface FetchEndAction {
    readonly type: typeof FETCH_END;
}

export interface FetchErrorAction {
    readonly type: typeof FETCH_ERROR;
}

export interface FetchCancelAction {
    readonly type: typeof FETCH_CANCEL;
}

export const fetchStart = (): FetchStartAction => ({ type: FETCH_START });
export const fetchEnd = (): FetchEndAction => ({ type: FETCH_END });
export const fetchError = (): FetchErrorAction => ({ type: FETCH_ERROR });
export const fetchCancel = (): FetchCancelAction => ({ type: FETCH_CANCEL });
