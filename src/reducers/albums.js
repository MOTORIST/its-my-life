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
import {OrderedMap, Record} from 'immutable';
import {arrToMap} from '../helpers/utils';
import {getToday} from '../helpers/dates';

export const AlbumMetaRecord = new Record({
  currentPage: null,
  countPages: null,
  total: null,
});

export const AlbumRecord = new Record({
  id: undefined,
  title: '',
  status: 1,
  description: '',
  cover: null,
  country: '',
  city: '',
  date: getToday(),
  isFetchPhotos: false,
  meta: null,
});

const ReducerState = Record({
  isFetching: false,
  entities: new OrderedMap({}),
});

export const defaultState = new ReducerState();

export function albums(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALBUMS + SUCCESS:
      return state
        .update('entities', entities =>arrToMap(payload, AlbumRecord).merge(entities))
        .set('isFetching', true);
    case FETCH_ALBUM + SUCCESS:
      return state.setIn(['entities', payload.id], new AlbumRecord(payload));
    case ADD_ALBUM + SUCCESS:
      return state.setIn(['entities', payload.id], new AlbumRecord(payload));
    case EDIT_ALBUM + SUCCESS:
      return state.mergeIn(['entities', payload.id], payload);
    case SET_COVER_ALBUM + SUCCESS:
      return state.setIn(['entities', payload.id, 'cover'], payload.cover);
    case SET_META_ALBUM:
      const meta = new AlbumMetaRecord({'currentPage': payload.currentPage, 'countPages': payload.countPages});
      return state.setIn(['entities', payload.id, 'meta'], meta);
    case DELETE_ALBUM + SUCCESS:
      return state.deleteIn(['entities', payload.id]);
    case IS_FETCH_PHOTOS:
      return state.setIn(['entities', payload.id, 'isFetchPhotos'], true);
    default:
      return state;
  }
}