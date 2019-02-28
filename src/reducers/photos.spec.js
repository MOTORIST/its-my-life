import photos, {defaultState, PhotoRecord, photos as photosReducer} from './photos';
import {OrderedMap} from 'immutable';
import {ADD_PHOTO, DELETE_PHOTO, FETCH_PHOTOS, SUCCESS} from '../constants/ActionTypes';

describe('reducer photo', () => {
  const defaultState = photos.__get__('defaultState');
  const photo = {
    id: 1,
    albumId: 2,
    title: "Vero cupiditate eligendi doloribus velit dolorum culpa autem.",
    image: "http://localhost:8080/storage/photos/1/46tH7HDIBR1t8td7OiejCgZLUxpRa5KVGkDamnb2.jpeg",
    thumbnail: "http://localhost:8080/storage/photos/1/thumb_46tH7HDIBR1t8td7OiejCgZLUxpRa5KVGkDamnb2.jpeg",
    thumbWidth: 300,
    thumbHeight: 200
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

    const expected = new PhotoRecord(photo);

    expect(photosReducer(defaultState, action).getIn(['entities', photo.id]).equals(expected)).toBe(true);
  });
});