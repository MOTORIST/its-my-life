import photos, {PhotoRecord, photos as photosReducer} from './photos';
import {OrderedMap} from 'immutable';
import {ADD_PHOTO, DELETE_PHOTO, EDIT_PHOTO, FETCH_PHOTO, FETCH_PHOTOS, SUCCESS} from '../constants/ActionTypes';

describe('reducer photo', () => {
  const defaultState = photos.__get__('defaultState');
  const ReducerState = photos.__get__('ReducerState');

  const photo = {
    id: 1,
    albumId: 2,
    title: "Vero cupiditate eligendi doloribus velit dolorum culpa autem.",
    image: "http://localhost:8080/storage/photos/1/46tH7HDIBR1t8td7OiejCgZLUxpRa5KVGkDamnb2.jpeg",
    thumbnail: "http://localhost:8080/storage/photos/1/thumb_46tH7HDIBR1t8td7OiejCgZLUxpRa5KVGkDamnb2.jpeg",
    thumbWidth: 300,
    thumbHeight: 200,
    metaExif: {
      camera: "Canon EOS 40D",
      aperture: "f/1.4",
      gps: null,
      exposure: "1/197",
      focusDistance: null,
      iso: 1600,
      focalLength: 50,
      orientation: 1,
      mimeType: "image/jpeg",
      software: null,
      flash: 16,
      creationDate: "2013-01-01 16:11:08"
    }
  };

  it(FETCH_PHOTOS + SUCCESS, () => {
    const action = {
      type: FETCH_PHOTOS + SUCCESS,
      payload: {
        idAlbum: photo.albumId,
        photos: [photo],
      },
    };

    const expected = (new OrderedMap()).set(photo.id, new PhotoRecord(photo));
    const nextState = photosReducer(defaultState, action);

    expect(nextState.get('entities')).toEqual(expected);
  });

  it(DELETE_PHOTO + SUCCESS, () => {
    const action = {
      type: DELETE_PHOTO + SUCCESS,
      payload: {
        id: photo.id,
      }
    };

    const state = defaultState.setIn(['entities', photo.id], new PhotoRecord(photo));

    expect(photosReducer(state, action).hasIn(['entities', photo.id])).toBe(false);
  });

  it(ADD_PHOTO, () => {
    const action = {
      type: ADD_PHOTO,
      payload: photo,
    };

    expect(photosReducer(defaultState, action).hasIn(['entities', photo.id])).toBe(true);
  });

  it(EDIT_PHOTO + SUCCESS, () => {
    const dataEditPhoto = {
      id: photo.id,
      title: "New title.",
    };

    const expectedPhoto = {
        ...photo,
        ...dataEditPhoto,
    };

    const action = {
      type: EDIT_PHOTO + SUCCESS,
      payload: dataEditPhoto,
    };

    const state = new ReducerState({
      entities: (new OrderedMap()).set(photo.id, new PhotoRecord(photo)),
    });

    const expected = new ReducerState({
      entities: (new OrderedMap()).set(photo.id, new PhotoRecord(expectedPhoto)),
    });

    const nextState = photosReducer(state, action);

    expect(nextState).toEqual(expected);
  });

  it(FETCH_PHOTO + SUCCESS, () => {
    const action = {
      type: FETCH_PHOTO + SUCCESS,
      payload: photo,
    };

    const state = new ReducerState({
      entities: (new OrderedMap()).set(photo.id, new PhotoRecord(photo)),
    });

    const nextState = photosReducer(state, action);

    const expected = new ReducerState({
      entities: (new OrderedMap()).set(photo.id, new PhotoRecord(photo)),
    });

    expect(nextState).toEqual(expected);
  });
});