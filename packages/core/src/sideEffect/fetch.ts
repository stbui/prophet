import { takeEvery, put, call } from 'redux-saga/effects';

export function* handleFetch(dataProvider, action) {
  const {
    type,
    payload,
    meta: { fetch: fetchMeta, onSuccess, onFailure, ...meta }
  } = action;
  const restType = fetchMeta;

  try {
    const response = yield call(dataProvider, restType, meta.resource, payload);
    console.log('dataProvider:', response, restType, meta.resource, payload);

    yield put({
      type: `${type}_SUCCESS`,
      payload: response,
      requestPayload: payload,
      meta: { ...meta, ...onSuccess, fetchResponse: restType }
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: `${type}_FAILURE`,
      error: error.message ? error.message : error,
      payload: error.body ? error.body : null,
      requestPayload: payload,
      meta: { ...meta, ...onFailure, fetchResponse: restType }
    });
  }
}

export const takeFetchAction = action => action.meta && action.meta.fetch;
export const fetch = dataProvider => {
  return function* watchFetch() {
    yield takeEvery(takeFetchAction, handleFetch, dataProvider);
  };
};

export default fetch;
