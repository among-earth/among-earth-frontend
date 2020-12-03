import { takeLatest, all, call } from 'redux-saga/effects';

import types from './user.actionTypes';
import * as actions from './user.actions';

export function* watchSetUserNickname() {
  yield takeLatest(types.SET_NICKNAME, actions.setUserNickname);
}

export default function* userSagas() {
  yield all([
    call(watchSetUserNickname),
  ]);
}
