import {
  ADD_PHOTO,
  DELETE_PHOTO,
  EDIT_PHOTO,
  FETCH_ALBUM_WITH_PHOTOS, FETCH_PHOTO,
  FETCH_PHOTOS,
  SUCCESS,
} from '../constants/ActionTypes';

export function fetchPhotos(idAlbum, page = null) {
  return {
    type: FETCH_PHOTOS,
    idAlbum: idAlbum,
    page: page,
  }
}

export function fetchPhotosSuccess(idAlbum, photos) {
  return {
    type: FETCH_PHOTOS + SUCCESS,
    payload: {
      idAlbum: idAlbum,
      photos: photos,
    },
  }
}

export function fetchAlbumWithPhotos(idAlbum) {
  return {
    type: FETCH_ALBUM_WITH_PHOTOS,
    idAlbum: idAlbum,
  };
}

export function addPhoto(photo) {
  return {
    type: ADD_PHOTO,
    payload: photo,
  }
}

export function deletePhoto(id) {
  return {
    type: DELETE_PHOTO,
    id: id,
  }
}

export function deletePhotoSuccess(id) {
  return {
    type: DELETE_PHOTO + SUCCESS,
    payload: {id: id}
  }
}

export function editPhoto(id, values) {
  return {
    type: EDIT_PHOTO,
    id: id,
    values: values,
  }
}

export function editPhotoSuccess(photo) {
  return {
    type: EDIT_PHOTO + SUCCESS,
    payload: photo,
  }
}

export function fetchPhoto(id) {
  return {
    type: FETCH_PHOTO,
    id: id,
  }
}

export function fetchPhotoSuccess(photo) {
  return {
    type: FETCH_PHOTO + SUCCESS,
    payload: photo,
  }
}