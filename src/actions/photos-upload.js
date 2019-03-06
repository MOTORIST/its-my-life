import {
  UPLOAD_PHOTO_ADD_TO_LIST,
  UPLOAD_PHOTO_CLEAR_ALL_STORE,
  UPLOAD_PHOTO_CLEAR_PHOTO,
  UPLOAD_PHOTO_SET_PROGRESS,
  UPLOAD_PHOTO_SET_STATUS,
  UPLOAD_PHOTOS
} from "../constants/ActionTypes";

export function uploadPhotos(dataPhotos) {
  return {
    type: UPLOAD_PHOTOS,
    dataPhotos: dataPhotos,
  };
}

export function addPhotoToList(photo) {
  return {
    type: UPLOAD_PHOTO_ADD_TO_LIST,
    payload: photo,
  }
}

export function setProgress(id, progress) {
  return {
    type: UPLOAD_PHOTO_SET_PROGRESS,
    payload: {
      id: id,
      progress: progress,
    },
  }
}

export function setStatus(id, status) {
  return {
    type: UPLOAD_PHOTO_SET_STATUS,
    payload: {
      id: id,
      status: status,
    },
  }
}

export function clearPhotoInStore(id) {
  return {
    type: UPLOAD_PHOTO_CLEAR_PHOTO,
    payload: {
      id: id,
    }
  }
}

export function clearPhotosInStore() {
  return {
    type: UPLOAD_PHOTO_CLEAR_ALL_STORE,
  }
}