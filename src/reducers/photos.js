import {ADD_PHOTO, DELETE_PHOTO, FETCH_PHOTOS, SUCCESS} from '../constants/ActionTypes';
import {arrToMap} from '../helpers/utils';
import {OrderedMap, Record} from 'immutable';

export const PhotoRecord = new Record({
  id: null,
  albumId: null,
  title: '',
  image: '',
  cover: '',
  thumbnail: '',
  thumbWidth: '',
  thumbHeight: '',
});

const ReducerState = new Record({
  entities: new OrderedMap(),
});

export const defaultState = new ReducerState();

export function photos(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PHOTOS + SUCCESS:
      return state.mergeIn(['entities'], arrToMap(payload.photos, PhotoRecord));
    case DELETE_PHOTO + SUCCESS:
      return state.deleteIn(['entities', payload.id]);
    case ADD_PHOTO:
      return state.setIn(['entities', payload.id], new PhotoRecord(payload));
    default:
      return state;
  }
}