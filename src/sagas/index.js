import {all, fork} from 'redux-saga/effects';
import watchUserSagas from '../sagas/user';

export default function* rootSaga() {
  yield all([
    fork(watchUserSagas),
  ]);
}