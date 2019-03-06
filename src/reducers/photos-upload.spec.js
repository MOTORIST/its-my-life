import {
  UPLOAD_PHOTO_ADD_TO_LIST,
  UPLOAD_PHOTO_CLEAR_PHOTO,
  UPLOAD_PHOTO_CLEAR_ALL_STORE,
  UPLOAD_PHOTO_SET_PROGRESS,
  UPLOAD_PHOTO_SET_STATUS
} from '../constants/ActionTypes';
import {defaultState, PhotoRecord, photosUpload as photosUploadReducer} from './photos-upload';
import {OrderedMap} from 'immutable';

describe('reducer photos uploads', () => {
  const photo = {
    id: "jmcbwuf7",
    fileName: "38554710119638802488.jpg",
    type: "image/jpeg",
    fileSize: 668712,
    thumbnail: "blob:http://localhost:3000/12733d3e-f542-4ae5-81fa-dbc21b44aa62",
    error: false,
    errorMessage: "",
    status: null,
    progress: 0
  };

  it(UPLOAD_PHOTO_ADD_TO_LIST, () => {
    const action = {
      type: UPLOAD_PHOTO_ADD_TO_LIST,
      payload: photo,
    };

    const expected = (new OrderedMap()).set(photo.id, new PhotoRecord(photo));
    const nextState = photosUploadReducer(defaultState, action);

    expect(nextState.getIn(['entities'])).toEqual(expected);
  });

  it(UPLOAD_PHOTO_SET_PROGRESS, () => {
    const action = {
      type: UPLOAD_PHOTO_SET_PROGRESS,
      payload: {
        id: photo.id,
        progress: 100,
      },
    };

    const state = defaultState.setIn(['entities', photo.id], new PhotoRecord(photo));
    const nextState = photosUploadReducer(state, action);

    expect(nextState.getIn(['entities', photo.id, 'progress'])).toBe(100);
  });

  it(UPLOAD_PHOTO_SET_STATUS, () => {
    const action = {
      type: UPLOAD_PHOTO_SET_STATUS,
      payload: {
        id: photo.id,
        status: true,
      },
    };

    const state = defaultState.setIn(['entities', photo.id], new PhotoRecord(photo));
    const nextState = photosUploadReducer(state, action);

    expect(nextState.getIn(['entities', photo.id, 'status'])).toBe(true);
  });

  it(UPLOAD_PHOTO_CLEAR_PHOTO, () => {
    const action = {
      type: UPLOAD_PHOTO_CLEAR_PHOTO,
      payload: {
        id: 1,
      }
    };

    const state = defaultState.setIn(['entities', photo.id], new PhotoRecord(photo));
    const nextState = photosUploadReducer(state, action);

    expect(nextState.hasIn(['entities', photo.id])).toBe(true);
  });

  it(UPLOAD_PHOTO_CLEAR_ALL_STORE, () => {
    const action = {
      type: UPLOAD_PHOTO_CLEAR_ALL_STORE,
    };

    const state = defaultState.setIn(['entities', photo.id], new PhotoRecord(photo));
    const nextState = photosUploadReducer(state, action);

    expect(nextState.get('entities').size).toBe(0);
  });
});