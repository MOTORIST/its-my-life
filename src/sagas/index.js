import {all, fork} from 'redux-saga/effects';
import watchUserSagas from '../sagas/user';
import watchAlbumsSagas from './albums';
import watchPhotosSagas from './photos';
import watchUploadPhotosSagas from './photos-upload';

export default function* rootSaga() {
  yield all([
    fork(watchUserSagas),
    fork(watchAlbumsSagas),
    fork(watchPhotosSagas),
    fork(watchUploadPhotosSagas),
  ]);
}