import photos from './photos';
import {all, call, put} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';
import webAPI, {DELETE, PATCH} from '../webAPI';
import {fetchAlbumSuccess, isFetchPhotos, setMetaAlbum} from '../actions/albums';
import {deletePhotoSuccess, editPhotoSuccess, fetchPhotosSuccess, fetchPhotoSuccess} from '../actions/photos';
import {snackbarError, snackbarSuccess} from '../actions/common';

describe('sagas photos', () => {
  const id = 1;
  const idAlbum = 1;
  const albumData = {
    data: {
      data: {
        id: 1,
      },
    }
  };

  const photosData = {
    data: {
      data: [],
      meta: {
        current_page: 1,
        last_page: 2,
      }
    },
  };

  const dataPhoto = {
    data: {
      data: {
        id: 37,
        albumId: 2,
        title: "Nam voluptas quisquam dolores dolor magnam cupiditate ea.",
        status: 1,
        image: "mqAIgfWMhvE5jONs16TgijCta5w1i05d8UDLTAhW.jpeg",
        cover: "cover_mqAIgfWMhvE5jONs16TgijCta5w1i05d8UDLTAhW.jpeg",
        thumbnail: "thumb_mqAIgfWMhvE5jONs16TgijCta5w1i05d8UDLTAhW.jpeg",
        thumbWidth: 300,
        thumbHeight: 600
      },
    }
  };

  describe('fetchAlbumWithPhotosSaga()', () => {
    const generator = cloneableGenerator(photos.__get__('fetchAlbumWithPhotosSaga'))({idAlbum});
    const gen1 = generator.clone();

    it('should get album with photos (api)', () => {
      expect(gen1.next().value).toEqual(
        all([
          call(webAPI, `/albums/${idAlbum}`),
          call(webAPI, `/albums/${idAlbum}/photos`)
        ])
      );
    });

    it('should call action fetchAlbumSuccess', () => {
      expect(gen1.next([albumData, photosData]).value).toEqual(put(fetchAlbumSuccess(albumData.data.data)))
    });

    it('should call action fetchPhotosSuccess', () => {
      expect(gen1.next().value).toEqual(put(fetchPhotosSuccess(idAlbum, photosData.data.data)));
    });

    it('should call action isFetchPhotos', () => {
      expect(gen1.next().value).toEqual(put(isFetchPhotos(idAlbum)));
    });

    it('should yield setMetaAlbumSaga', () => {
      const setMetaAlbumSaga = photos.__get__('setMetaAlbumSaga');
      expect(gen1.next().value).toEqual(setMetaAlbumSaga(idAlbum, photosData.data.meta));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Unable to load data.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('fetchPhotosSaga()', () => {
    describe('if page not empty', () => {
      const page = 2;
      const generator = photos.__get__('fetchPhotosSaga')({idAlbum, page});

      it('should get photos, if page not empty (api)', () => {
        expect(generator.next().value).toEqual(call(webAPI, `/albums/${idAlbum}/photos?page=${page}`));
      });

      it('should be done', () => {
        generator.next();
        expect(generator.next().done).toEqual(true);
      });
    });

    describe('if page empty', () => {
      const page = null;
      const generator = cloneableGenerator(photos.__get__('fetchPhotosSaga'))({idAlbum, page});
      const gen1 = generator.clone();

      it('should get photos (api)', () => {
        expect(gen1.next().value).toEqual(call(webAPI, `/albums/${idAlbum}/photos`));
      });

      it('should call action fetchPhotosSuccess', () => {
        expect(gen1.next(photosData).value).toEqual(put(fetchPhotosSuccess(idAlbum, photosData.data.data)));
      });

      it('should call action isFetchPhotos', () => {
        expect(gen1.next().value).toEqual(put(isFetchPhotos(idAlbum)));
      });

      it('should yield setMetaAlbumSaga', () => {
        const setMetaAlbumSaga = photos.__get__('setMetaAlbumSaga');
        expect(gen1.next().value).toEqual(setMetaAlbumSaga(idAlbum, photosData.data.meta));
      });

      it('should call action snackbarError ', () => {
        const gen2 = generator.clone();
        gen2.next();
        expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Unable to load albums.')));
      });

      it('should be done', () => {
        gen1.next();
        expect(gen1.next().done).toEqual(true);
      });
    });
  });

  describe('setMetaAlbumSaga()', () => {
    const generator = photos.__get__('setMetaAlbumSaga')(idAlbum, photosData.data.meta);

    it('should call action setMetaAlbum', () => {
      expect(generator.next().value)
        .toEqual(put(setMetaAlbum(idAlbum, photosData.data.meta.current_page, photosData.data.meta.last_page)));
    });

    it('should be done', () => {
      generator.next();
      expect(generator.next().done).toEqual(true);
    });
  });

  describe('fetchPhotoSaga()', () => {
    const id = 1;
    const generator = cloneableGenerator(photos.__get__('fetchPhotoSaga'))({id});
    const gen1 = generator.clone();

    it('should get photo (api)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, `photos/${id}`));
    });

    it('should call action fetchPhotoSuccess', () => {
      expect(gen1.next(dataPhoto).value).toEqual(put(fetchPhotoSuccess(dataPhoto.data.data)));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Unable to load photo.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('editPhotoSaga()', () => {
    const id = 1;
    const values = {
      status: 1,
      title: 'title',
    };
    const generator = cloneableGenerator(photos.__get__('editPhotoSaga'))({id, values});
    const gen1 = generator.clone();

    it('should call webAPI (PATCH)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, `photos/${id}`, PATCH, values));
    });

    it('shuld call action editPhotoSuccess', () => {
      expect(gen1.next(dataPhoto).value).toEqual(put(editPhotoSuccess(dataPhoto.data.data)));
    });

    it('should call action snackbarSuccess', () => {
      expect(gen1.next().value).toEqual(put(snackbarSuccess('Photo changed.')));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Failed to change data photo.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('deletePhotoSaga()', () => {
    const generator = cloneableGenerator(photos.__get__('deletePhotoSaga'))({id});
    const gen1 = generator.clone();

    it('should delete photo (api)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, `/photos/${id}`, DELETE));
    });

    it('should call action deletePhotoSuccess', () => {
      expect(gen1.next().value).toEqual(put(deletePhotoSuccess(id)));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Unable to delete photo.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });
});