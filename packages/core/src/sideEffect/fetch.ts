import { takeEvery, put } from 'redux-saga/effects';

export function* handleFetch(dataProvider, action) {
  const {
    type,
    payload,
    meta: { fetch: fetchMeta, onSuccess, onFailure, ...meta }
  } = action;
  const restType = fetchMeta;

  yield put({
    type: `${type}_SUCCESS`,
    payload: {
      data: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号'
        }
      ]
    },
    requestPayload: payload,
    meta: { ...meta, ...onSuccess, fetchResponse: restType }
  });
}

export const takeFetchAction = action => action.meta && action.meta.fetch;
export const fetch = dataProvider => {
  return function* watchFetch() {
    yield takeEvery(takeFetchAction, handleFetch, dataProvider);
  };
};

export default fetch;
