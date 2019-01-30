import {all, fork} from 'redux-saga/effects';
import watchUserSagas from '../sagas/user';
import watchAlbumsSagas from './albums';

export default function* rootSaga() {
  yield all([
    fork(watchUserSagas),
    fork(watchAlbumsSagas),
  ]);
}