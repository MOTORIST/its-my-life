import {ADD_PHOTO, DELETE_PHOTO, FETCH_ALBUM_WITH_PHOTOS, FETCH_PHOTOS, SUCCESS,} from '../constants/ActionTypes';

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