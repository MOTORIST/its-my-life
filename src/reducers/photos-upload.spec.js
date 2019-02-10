import {LOAD_PHOTO_ADD_TO_LIST, LOAD_PHOTO_SET_PROGRESS, LOAD_PHOTO_SET_STATUS} from '../constants/ActionTypes';
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

  it(LOAD_PHOTO_ADD_TO_LIST, () => {
    const action = {
      type: LOAD_PHOTO_ADD_TO_LIST,
      payload: photo,
    };

    const expected = (new OrderedMap()).set(photo.id, new PhotoRecord(photo));

    expect(
      photosUploadReducer(defaultState, action)
        .getIn(['entities'])
        .equals(expected)
    ).toBe(true);
  });

  it(LOAD_PHOTO_SET_PROGRESS, () => {
    const action = {
      type: LOAD_PHOTO_SET_PROGRESS,
      payload: {
        id: photo.id,
        progress: 100,
      },
    };

    const state = defaultState.setIn(['entities', photo.id], new PhotoRecord(photo));

    expect(photosUploadReducer(state, action).getIn(['entities', photo.id, 'progress'])).toBe(100);
  });

  it(LOAD_PHOTO_SET_STATUS, () => {
    const action = {
      type: LOAD_PHOTO_SET_STATUS,
      payload: {
        id: photo.id,
        status: true,
      },
    };

    const state = defaultState.setIn(['entities', photo.id], new PhotoRecord(photo));

    expect(photosUploadReducer(state, action).getIn(['entities', photo.id, 'status']));
  });
});