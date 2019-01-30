import {AlbumMetaRecord, AlbumRecord, albums as albumsReducer, defaultState} from './albums';
import {
  ADD_ALBUM,
  DELETE_ALBUM,
  EDIT_ALBUM,
  FETCH_ALBUM,
  FETCH_ALBUMS,
  IS_FETCH_PHOTOS,
  SET_COVER_ALBUM,
  SET_META_ALBUM,
  SUCCESS
} from '../constants/ActionTypes';
import {OrderedMap, Record} from 'immutable';

describe('reducer albums', () => {
  const album = {
      id: 1,
      title: "Autem eos iure explicabo...",
      city: "Волоколамск",
      country: "Барбадос",
      cover: "http://localhost:8080/storage/photos/1/cover_46tH7HDIBR1t8td7OiejCgZLUxpRa5KVGkDamnb2.jpeg",
      date: "1996-04-10",
      description: "Dolores voluptatem ex incidunt minus ducimus distinctio quis dolorem.",
      status: 1,
      isFetchPhotos: false,
      meta: null
    };

  it('should return default state', () => {
    expect(albumsReducer(undefined, {})).toEqual(defaultState);
  });

  it(FETCH_ALBUMS + SUCCESS, () => {
    const action = {
      type: FETCH_ALBUMS + SUCCESS,
      payload: [
        album,
      ],
    };

    const ExpectedStateRecord = Record({
      isFetching: true,
      entities: (new OrderedMap()).set(1, new AlbumRecord(album)),
    });

    const expected = (new ExpectedStateRecord());

    expect(albumsReducer(defaultState, action).equals(expected)).toBe(true);
  });

  it(FETCH_ALBUM + SUCCESS, () => {
    const action = {
      type: FETCH_ALBUM + SUCCESS,
      payload: album,
    };

    const ExpectedStateRecord = Record({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    const expected = new ExpectedStateRecord();

    expect(albumsReducer(defaultState, action).equals(expected)).toEqual(true);
  });

  it(ADD_ALBUM + SUCCESS, () => {
    const action = {
      type: ADD_ALBUM + SUCCESS,
      payload: album,
    };

    const ExpectedStateRecord = Record({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    const expected = new ExpectedStateRecord();

    expect(albumsReducer(defaultState, action).equals(expected)).toEqual(true);
  });

  it(EDIT_ALBUM + SUCCESS, () => {
    const action = {
      type: EDIT_ALBUM + SUCCESS,
      payload: album,
    };

    const state = defaultState.set('isFetching', true);

    const ExpectedStateRecord = Record({
      isFetching: true,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    const expected = new ExpectedStateRecord();

    expect(albumsReducer(state, action).equals(expected)).toEqual(true);
  });

  it(SET_COVER_ALBUM + SUCCESS, () => {
    const action = {
      type: SET_COVER_ALBUM + SUCCESS,
      payload: album,
    };

    const albumWithOutCover = {
      ...album,
      cover: '',
    };

    const state = defaultState.setIn(['entities', 1], new AlbumRecord(albumWithOutCover));

    const ExpectedStateRecord = Record({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    const expected = new ExpectedStateRecord();

    expect(albumsReducer(state, action).equals(expected)).toBe(true);
  });

  it(SET_META_ALBUM, () => {
    const action = {
      type: SET_META_ALBUM,
      payload: {
        id: album.id,
        currentPage: 2,
        countPages: 3,
      }
    };

    const ExpectedStateRecord = Record({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    const state = new ExpectedStateRecord();

    const expected = state.setIn(['entities', album.id, 'meta'], new AlbumMetaRecord({
      'currentPage': action.payload.currentPage,
      'countPages': action.payload.countPages,
    }));

    expect(albumsReducer(state, action).equals(expected)).toBe(true);
  });

  it(DELETE_ALBUM + SUCCESS, () => {
    const action = {
      type: DELETE_ALBUM + SUCCESS,
      payload: {
        id: album.id,
      }
    };

    const StateRecord = Record({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    const state = new StateRecord();
    const isHasAlbum = albumsReducer(state, action).hasIn(['entities', album.id]);
    expect(isHasAlbum).toBe(false);
  });

  it(IS_FETCH_PHOTOS, () => {
    const action = {
      type: IS_FETCH_PHOTOS,
      payload: {
        id: album.id,
      }
    };

    const StateRecord = Record({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    const state = new StateRecord();

    expect(albumsReducer(state, action).getIn(['entities', album.id, 'isFetchPhotos'])).toBe(true);
  });

});