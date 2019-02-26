import albums, {AlbumRecord, AlbumMetaRecord, albums as albumsReducer, defaultState} from './albums';
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
import {OrderedMap} from 'immutable';

describe('reducer albums', () => {
  const ReducerState = albums.__get__('ReducerState');
  const album = {
      id: 1,
      title: "Autem eos iure explicabo...",
      city: "Moscow",
      country: "Russia",
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

    const nextState = albumsReducer(defaultState, action);
    const expected = new ReducerState({
      isFetching: true,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    expect(nextState).toEqual(expected);
  });

  it(FETCH_ALBUM + SUCCESS, () => {
    const action = {
      type: FETCH_ALBUM + SUCCESS,
      payload: album,
    };
    const nextState = albumsReducer(defaultState, action);
    const expected = new ReducerState({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    expect(nextState).toEqual(expected);
  });

  it(ADD_ALBUM + SUCCESS, () => {
    const action = {
      type: ADD_ALBUM + SUCCESS,
      payload: album,
    };

    const nextState = albumsReducer(defaultState, action);
    const expected = new ReducerState({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    expect(nextState).toEqual(expected);
  });

  it(EDIT_ALBUM + SUCCESS, () => {
    const action = {
      type: EDIT_ALBUM + SUCCESS,
      payload: album,
    };

    const state = defaultState.set('isFetching', true);
    const nextState = albumsReducer(state, action);

    const expected = new ReducerState({
      isFetching: true,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    expect(nextState).toEqual(expected);
  });

  it(SET_COVER_ALBUM + SUCCESS, () => {
    const action = {
      type: SET_COVER_ALBUM + SUCCESS,
      payload: album,
    };

    const albumWithOutCover = {
      ...album,
      cover: null,
    };

    const state = defaultState.setIn(['entities', 1], new AlbumRecord(albumWithOutCover));
    const nextState = albumsReducer(state, action);

    const expected = new ReducerState({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    expect(nextState).toEqual(expected);
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

    const state = new ReducerState({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    const nextState = albumsReducer(state, action);

    const metaAlbum = new AlbumMetaRecord({
      'currentPage': action.payload.currentPage,
      'countPages': action.payload.countPages,
    });
    const expected = state.setIn(['entities', album.id, 'meta'], metaAlbum);

    expect(nextState).toEqual(expected);
  });

  it(DELETE_ALBUM + SUCCESS, () => {
    const action = {
      type: DELETE_ALBUM + SUCCESS,
      payload: {
        id: album.id,
      }
    };

    const state = new ReducerState({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

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

    const state = new ReducerState({
      isFetching: false,
      entities: (new OrderedMap()).set(album.id, new AlbumRecord(album)),
    });

    const isFetchPhotos = albumsReducer(state, action).getIn(['entities', album.id, 'isFetchPhotos']);

    expect(isFetchPhotos).toBe(true);
  });

});