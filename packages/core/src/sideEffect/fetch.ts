import { takeEvery, put, call, all, cancelled } from 'redux-saga/effects';
import { FETCH_CANCEL, FETCH_END, FETCH_ERROR, FETCH_START } from '../actions';

export function* handleFetch(dataProvider, action) {
  const {
    type,
    payload,
    meta: { fetch: fetchMeta, onSuccess, onFailure, ...meta }
  } = action;
  const restType = fetchMeta;

  try {
    yield all([put({ type: FETCH_START })]);
    const response = yield call(dataProvider, restType, meta.resource, payload);
    // console.log('dataProvider:', response, restType, meta.resource, payload);

    yield put({
      type: `${type}_SUCCESS`,
      payload: response,
      requestPayload: payload,
      meta: {
        ...meta,
        ...onSuccess,
        fetchResponse: restType,
        fetchStatus: FETCH_END
      }
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
        fetchStatus: FETCH_ERROR
      }
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
