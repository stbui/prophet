/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { takeEvery, put, call, all, cancelled } from 'redux-saga/effects';
import {
    FETCH_CANCEL,
    FETCH_END,
    FETCH_ERROR,
    FETCH_START,
    GET_LIST,
} from '../actions';

export function* handleFetch(dataProvider: any, action: any) {
    const {
        type,
        payload,
        meta: { fetch: fetchMeta, onSuccess, onFailure, ...meta },
    } = action;
    const restType = fetchMeta;

    try {
        yield all([
            put({ type: `${type}_LOADING`, payload, meta }),
            put({ type: FETCH_START }),
        ]);
        const response = yield call(
            dataProvider,
            restType,
            meta.resource,
            payload
        );
        if (!response.hasOwnProperty('data')) {
            throw Error(
                `${restType}: 必须是{ data: ...}, response中没有包含 'data' 键值`
            );
        }

        if ([GET_LIST].includes(restType) && !Array.isArray(response.data)) {
            throw Error(
                `${restType}: 必须是{ data: [...] }, 返回的data不是数组`
            );
        }

        if (
            [GET_LIST].includes(restType) &&
            Array.isArray(response.data) &&
            response.data.length > 0 &&
            !response.data[0].hasOwnProperty('id')
        ) {
            throw Error(
                `${restType}: 必须是{ data: [{ id: 123, ...}, ...] }, 返回的数据data项没有 'id' 键值`
            );
        }

        if (
            [GET_LIST].includes(restType) &&
            !response.hasOwnProperty('total')
        ) {
            throw Error(
                `${restType}: 必须是{ data: [...], total: 123 }, 返回的data不是数组`
            );
        }

        yield put({
            type: `${type}_SUCCESS`,
            payload: response,
            requestPayload: payload,
            meta: {
                ...meta,
                ...onSuccess,
                fetchResponse: restType,
                fetchStatus: FETCH_END,
            },
        });

        yield put({ type: FETCH_END });
    } catch (error) {
        yield put({
            type: `${type}_FAILURE`,
            error: error.message ? error.message : error,
            payload: error.body ? error.body : null,
            requestPayload: payload,
            meta: {
                ...meta,
                ...onFailure,
                fetchResponse: restType,
                fetchStatus: FETCH_ERROR,
            },
        });

        yield put({ type: FETCH_ERROR, error });
    } finally {
        if (yield cancelled()) {
            yield put({ type: FETCH_CANCEL });
            return;
        }
    }
}

export const takeFetchAction = action => action.meta && action.meta.fetch;
export const fetch = dataProvider => {
    return function* watchFetch() {
        yield takeEvery(takeFetchAction, handleFetch, dataProvider);
    };
};

export default fetch;
