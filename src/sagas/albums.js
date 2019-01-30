import {all, call, put, takeLatest} from 'redux-saga/effects';
import webAPI, {DELETE, PATCH, POST} from '../webAPI';
import {
  ADD_ALBUM,
  DELETE_ALBUM,
  EDIT_ALBUM,
  FETCH_ALBUM,
  FETCH_ALBUMS,
  SET_COVER_ALBUM
} from '../constants/ActionTypes';
import {
  addAlbumSuccess,
  deleteAlbumSuccess,
  editAlbumSuccess,
  fetchAlbumsSuccess,
  fetchAlbumSuccess,
  setCoverSuccess
} from '../actions/albums';
import {snackbarError, snackbarSuccess} from '../actions/common';

function* fetchAlbumsSaga() {
  try {
    const albums = yield call(webAPI, '/albums');

    if(albums) {
      yield put(fetchAlbumsSuccess(albums.data.data));
    }

  } catch (e) {
    yield put(snackbarError('Error! Unable to load albums.'));
  }
}

function* fetchAlbumSaga({id}) {
  try {
    const album = yield call(webAPI, `/albums/${id}`);

    if(album) {
      yield put(fetchAlbumSuccess(album.data.data));
    }
  } catch (e) {
    yield put(snackbarError('Error! Unable to load album.'));
  }
}

function* addAlbumSaga({values}) {
  try {
    const album = yield call(webAPI, '/albums', POST, values);

    if(album) {
      yield put(addAlbumSuccess(album.data.data));
      yield put(snackbarSuccess('Album created.'));
    }
  } catch (e) {
    yield put(snackbarError('Error! Could not create album.'));
  }
}

function* editAlbumSaga({id, values}) {
  try {
    const album = yield call(webAPI, `/albums/${id}`, PATCH, values);

    if(album) {
      yield put(editAlbumSuccess(album.data.data));
      yield put(snackbarSuccess('Album edited.'));
    }
  } catch (e) {
    yield put(snackbarError('Error! Could not edit album.'));
  }
}

function* setCoverSaga({id, idPhoto}) {
  try {
    const album = yield call(webAPI, `/albums/${id}`, PATCH, {cover: idPhoto});

    if(album) {
      yield put(setCoverSuccess(album.data.data));
      yield put(snackbarSuccess('Album cover installed.'));
    }
  } catch (e) {
    yield put(snackbarError('Error! Could not installed album cover.'));
  }
}

function* deleteAlbumSaga({id}) {
  try {
    yield call(webAPI, `/albums/${id}`, DELETE);
    yield put(deleteAlbumSuccess(id));
    yield put(snackbarSuccess('Album deleted.'));
  } catch (e) {
    yield put(snackbarError('Error! Could not delete album.'));
  }
}

function* watchAlbumsSagas() {
  yield all([
    takeLatest(FETCH_ALBUMS, fetchAlbumsSaga),
    takeLatest(FETCH_ALBUM, fetchAlbumSaga),
    takeLatest(ADD_ALBUM, addAlbumSaga),
    takeLatest(EDIT_ALBUM, editAlbumSaga),
    takeLatest(SET_COVER_ALBUM, setCoverSaga),
    takeLatest(DELETE_ALBUM, deleteAlbumSaga),
  ]);
}

export default watchAlbumsSagas;