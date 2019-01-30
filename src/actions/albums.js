import {
  ADD_ALBUM,
  DELETE_ALBUM,
  EDIT_ALBUM,
  FETCH_ALBUM,
  FETCH_ALBUMS,
  IS_FETCH_PHOTOS,
  SET_COVER_ALBUM,
  SET_META_ALBUM,
  SUCCESS,
} from '../constants/ActionTypes';

export function fetchAlbums() {
  return {
    type: FETCH_ALBUMS,
  };
}

export function fetchAlbumsSuccess(albums) {
  return {
    type: FETCH_ALBUMS + SUCCESS,
    payload: albums,
  };
}

export function fetchAlbumSuccess(album) {
  return {
    type: FETCH_ALBUM + SUCCESS,
    payload: album,
  }
}

export function addAlbum(values) {
  return {
    type: ADD_ALBUM,
    values: values,
  };
}

export function addAlbumSuccess(album) {
  return {
    type: ADD_ALBUM + SUCCESS,
    payload: album,
  };
}

export function editAlbum(id, values) {
  return {
    type: EDIT_ALBUM,
    id: id,
    values: values,
  };
}

export function editAlbumSuccess(album) {
  return {
    type: EDIT_ALBUM + SUCCESS,
    payload: album,
  };
}


export function setCover(id, idPhoto) {
  return {
    type: SET_COVER_ALBUM,
    id: id,
    idPhoto: idPhoto,
  };
}

export function setCoverSuccess(album) {
  return {
    type: SET_COVER_ALBUM + SUCCESS,
    payload: album,
  }
}

export function setMetaAlbum(id, currentPage, countPages) {
  return {
    type: SET_META_ALBUM,
    payload: {
      id: id,
      currentPage: currentPage,
      countPages: countPages,
    }
  }
}

export function deleteAlbum(id) {
  return {
    type: DELETE_ALBUM,
    id: id,
  }
}

export function deleteAlbumSuccess(id) {
  return {
    type: DELETE_ALBUM + SUCCESS,
    payload: {
      id: id,
    }
  }
}

export  function isFetchPhotos(id) {
  return {
    type: IS_FETCH_PHOTOS,
    payload: {
      id: id,
    }
  }
}