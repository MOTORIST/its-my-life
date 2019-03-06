import {OrderedMap, Record} from 'immutable';
import {
  UPLOAD_PHOTO_ADD_TO_LIST,
  UPLOAD_PHOTO_CLEAR_ALL_STORE,
  UPLOAD_PHOTO_CLEAR_PHOTO,
  UPLOAD_PHOTO_SET_PROGRESS,
  UPLOAD_PHOTO_SET_STATUS
} from "../constants/ActionTypes";

export const PhotoRecord = new Record({
  id: undefined,
  fileName: '',
  type: '',
  fileSize: 0,
  thumbnail: '',
  error: false,
  errorMessage: '',
  status: null,
  progress: 0,
});

const ReducerState = new Record({
  entities: new OrderedMap({}),
});

export const defaultState = new ReducerState();

export function photosUpload(state = defaultState, action) {
  const {type, payload} = action;

  switch (type) {
    case UPLOAD_PHOTO_ADD_TO_LIST:
      return state.setIn(['entities', payload.id], new PhotoRecord(payload));
    case UPLOAD_PHOTO_SET_PROGRESS:
      return state.setIn(['entities', payload.id, 'progress'], payload.progress);
    case UPLOAD_PHOTO_SET_STATUS:
      return state.setIn(['entities', payload.id, 'status'], payload.status);
    case UPLOAD_PHOTO_CLEAR_PHOTO:
      return state.deleteIn(['entities', payload.id]);
    case UPLOAD_PHOTO_CLEAR_ALL_STORE:
      return state.deleteIn(['entities']);
    default:
      return state;
  }
}