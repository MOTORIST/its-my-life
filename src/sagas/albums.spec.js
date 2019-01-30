import albums from './albums';
import webAPI, {DELETE, PATCH, POST} from '../webAPI';
import {call, put} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';
import {
  addAlbumSuccess,
  deleteAlbumSuccess,
  editAlbumSuccess,
  fetchAlbumsSuccess,
  fetchAlbumSuccess,
  setCoverSuccess
} from '../actions/albums';
import {snackbarError, snackbarSuccess} from '../actions/common';

describe('sagas albums', () => {
  const id = 1;
  const idPhoto = 1;
  const values = {
    'title': 'title',
  };
  const dataAlbum = {
    data: {
      data: {
        id : 1,
      }
    },
  };
  const albumsData = {
    data: {
      data: [
        {
          id: 1,
        }
      ]
    }
  };

  describe('fetchAlbumsSaga()', () => {
    it('should return albums (api)', () => {
      const generator = albums.__get__('fetchAlbumsSaga')();
      expect(generator.next().value).toEqual(call(webAPI, '/albums'));
    });

    it('should call action fetchAlbumsSuccess if albums', () => {
      const generator = albums.__get__('fetchAlbumsSaga')();
      generator.next();
      expect(generator.next(albumsData).value).toEqual(put(fetchAlbumsSuccess(albumsData.data.data)));
    });

    it('should call action snackbarError() ', () => {
      const generator = albums.__get__('fetchAlbumsSaga')();
      generator.next();
      expect(generator.throw(new Error()).value).toEqual(put(snackbarError('Error! Unable to load albums.')));
    });

    it('should be done', () => {
      const generator = albums.__get__('fetchAlbumsSaga')();
      generator.next();
      expect(generator.next().done).toEqual(true);
    });
  });

  describe('fetchAlbumSaga()', () => {
    it('should return album (api)', () => {
      const generator = albums.__get__('fetchAlbumSaga')({id});
      expect(generator.next().value).toEqual(call(webAPI, `/albums/${id}`));
    });

    it('should call action fetchAlbumsSuccess if albums', () => {
      const generator = albums.__get__('fetchAlbumSaga')({id});
      generator.next();
      expect(generator.next(dataAlbum).value).toEqual(put(fetchAlbumSuccess(dataAlbum.data.data)));
    });

    it('should call action snackbarError ', () => {
      const generator = albums.__get__('fetchAlbumSaga')({id});
      generator.next();
      expect(generator.throw(new Error()).value).toEqual(put(snackbarError('Error! Unable to load album.')));
    });

    it('should be done', () => {
      const generator = albums.__get__('fetchAlbumSaga')({id});
      generator.next();
      expect(generator.next().done).toEqual(true);
    });
  });

  describe('addAlbumSaga()', () => {
    it('should return album (api)', () => {
      const generator = albums.__get__('addAlbumSaga')({values});
      expect(generator.next().value).toEqual(call(webAPI, '/albums', POST, values));
    });

    describe('if success and return album', () => {
      const generator = albums.__get__('addAlbumSaga')({values});
      generator.next();

      it('should call action addAlbumSuccess', () => {
        expect(generator.next(dataAlbum).value).toEqual(put(addAlbumSuccess(dataAlbum.data.data)));
      });

      it('should call action snackbarSuccess', () => {
        expect(generator.next().value).toEqual(put(snackbarSuccess('Album created.')));
      });
    });

    it('should call action snackbarError ', () => {
      const generator = albums.__get__('addAlbumSaga')({values});
      generator.next();
      expect(generator.throw(new Error()).value).toEqual(put(snackbarError('Error! Could not create album.')));
    });

    it('should be done', () => {
      const generator = albums.__get__('addAlbumSaga')({values});
      generator.next();
      expect(generator.next().done).toEqual(true);
    });
  });

  describe('editAlbumSaga()', () => {
    const generator = cloneableGenerator(albums.__get__('editAlbumSaga'))({id, values});
    const gen1 = generator.clone();

    it('should call method web api (edit album)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, `/albums/${id}`, PATCH, values));
    });

    it('should call action editAlbumSuccess', () => {
      expect(gen1.next(dataAlbum).value).toEqual(put(editAlbumSuccess(dataAlbum.data.data)));
    });

    it('should call action snackbarSuccess', () => {
      expect(gen1.next().value).toEqual(put(snackbarSuccess('Album edited.')));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Could not edit album.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('setCoverSaga()', () => {
    const generator = cloneableGenerator(albums.__get__('setCoverSaga'))({id, idPhoto});
    const gen1 = generator.clone();

    it('should call method web api (set cover album)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, `/albums/${id}`, PATCH, {cover: idPhoto}));
    });

    it('should call action setCoverSuccess', () => {
      expect(gen1.next(dataAlbum).value).toEqual(put(setCoverSuccess(dataAlbum.data.data)));
    });

    it('should call action snackbarSuccess', () => {
      expect(gen1.next().value).toEqual(put(snackbarSuccess('Album cover installed.')));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Could not installed album cover.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('deleteAlbumSaga()', () => {
    const generator = cloneableGenerator(albums.__get__('deleteAlbumSaga'))({id});
    const gen1 = generator.clone();

    it('should call method web api (delete album)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, `/albums/${id}`, DELETE));
    });

    it('should call action deleteAlbumSuccess', () => {
      expect(gen1.next().value).toEqual(put(deleteAlbumSuccess(id)));
    });

    it('should call action snackbarSuccess', () => {
      expect(gen1.next().value).toEqual(put(snackbarSuccess('Album deleted.')));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Could not delete album.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

});