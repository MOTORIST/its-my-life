import {ADD_PHOTO, DELETE_PHOTO, EDIT_PHOTO, FETCH_PHOTO, FETCH_PHOTOS, SUCCESS} from '../constants/ActionTypes';
import {arrToMap} from '../helpers/utils';
import {OrderedMap, Record} from 'immutable';

const metaExif = {
  camera: null,
  aperture: null,
  gps: null,
  exposure: null,
  focusDistance: null,
  iso: null,
  focalLength: null,
  orientation: null,
  mimeType: null,
  software: null,
  flash: null,
  creationDate: null
};

export const PhotoRecord = new Record({
  id: null,
  albumId: null,
  title: '',
  status: 1,
  image: '',
  cover: '',
  thumbnail: '',
  thumbWidth: '',
  thumbHeight: '',
  metaExif
});

const ReducerState = new Record({
  entities: new OrderedMap(),
});

const defaultState = new ReducerState();

export function photos(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PHOTOS + SUCCESS:
      return state.mergeIn(['entities'], arrToMap(payload.photos, PhotoRecord));
    case DELETE_PHOTO + SUCCESS:
      return state.deleteIn(['entities', payload.id]);
    case ADD_PHOTO:
      return state.setIn(['entities', payload.id], new PhotoRecord(payload));
    case EDIT_PHOTO + SUCCESS:
      return state.mergeIn(['entities', payload.id], payload);
    case FETCH_PHOTO + SUCCESS:
      return state.setIn(['entities', payload.id], new PhotoRecord(payload));
    default:
      return state;
  }
}