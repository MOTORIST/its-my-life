import {all, call, put, takeLatest} from 'redux-saga/effects';
import webAPI, {DELETE, PATCH} from '../webAPI';
import {snackbarError, snackbarSuccess} from '../actions/common';
import {deletePhotoSuccess, editPhotoSuccess, fetchPhotosSuccess, fetchPhotoSuccess} from '../actions/photos';
import {DELETE_PHOTO, EDIT_PHOTO, FETCH_ALBUM_WITH_PHOTOS, FETCH_PHOTO, FETCH_PHOTOS} from '../constants/ActionTypes';
import {fetchAlbumSuccess, isFetchPhotos, setMetaAlbum} from '../actions/albums';

function* fetchAlbumWithPhotosSaga({idAlbum}) {
  try {
    const [album, photos] = yield all([
      call(webAPI, `/albums/${idAlbum}`),
      call(webAPI, `/albums/${idAlbum}/photos`)
    ]);

    if(album) {
      yield put(fetchAlbumSuccess(album.data.data));
    }

    if(photos) {
      yield put(fetchPhotosSuccess(idAlbum, photos.data.data));
      yield put(isFetchPhotos(idAlbum));
      yield setMetaAlbumSaga(idAlbum, photos.data.meta);
    }

  } catch (e) {
    yield put(snackbarError('Error! Unable to load data.'));
  }
}

function* fetchPhotosSaga({idAlbum, page}) {
  try {
    let photos = null;

    if(page) {
      photos = yield call(webAPI, `/albums/${idAlbum}/photos?page=${page}`);
    } else {
      photos = yield call(webAPI, `/albums/${idAlbum}/photos`);
    }

    if(photos && photos.data) {
      yield put(fetchPhotosSuccess(idAlbum, photos.data.data));
      yield put(isFetchPhotos(idAlbum));
      yield (setMetaAlbumSaga(idAlbum, photos.data.meta));
    }
  } catch (e) {
    yield put(snackbarError('Error! Unable to load albums.'));
  }
}

function* setMetaAlbumSaga(idAlbum, meta) {
  if(meta) {
    yield put(setMetaAlbum(idAlbum, meta.current_page, meta.last_page));
  }
}

function* deletePhotoSaga({id}) {
  try {
    yield call(webAPI, `/photos/${id}`, DELETE);
    yield put(deletePhotoSuccess(id));
  } catch (e) {
    yield put(snackbarError('Error! Unable to delete photo.'));
  }
}

function* fetchPhotoSaga({id}) {
  try {
    const photo = yield call(webAPI, `photos/${id}`);

    if(photo && photo.data) {
      yield put(fetchPhotoSuccess(photo.data.data));
    }
  } catch (e) {
    yield put(snackbarError('Error! Unable to load photo.'));
  }
}

function* editPhotoSaga({id, values}) {
  const data = {
    status: values.status ? 1 : null,
    title: values.title,
  };

  try {
    const photo = yield call(webAPI, `photos/${id}`, PATCH, data);

    if(photo) {
      yield put(editPhotoSuccess(photo.data.data));
      yield put(snackbarSuccess('Photo changed.'));
    }
  } catch (e) {
    yield put(snackbarError('Error! Unable to load data photo.'));
  }
}

function* watchPhotosSagas() {
  yield all([
    takeLatest(FETCH_ALBUM_WITH_PHOTOS, fetchAlbumWithPhotosSaga),
    takeLatest(FETCH_PHOTOS, fetchPhotosSaga),
    takeLatest(FETCH_PHOTO, fetchPhotoSaga),
    takeLatest(DELETE_PHOTO, deletePhotoSaga),
    takeLatest(EDIT_PHOTO, editPhotoSaga),
  ]);
}

export default watchPhotosSagas;