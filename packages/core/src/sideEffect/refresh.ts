import { put, takeEvery } from 'redux-saga/effects';
import { refreshView } from '../actions';

function* handleRefresh() {
    yield put(refreshView());
}

export const takeRefreshActions = action => action.meta && action.meta.refresh;

export default function*() {
    yield takeEvery(takeRefreshActions, handleRefresh);
}
