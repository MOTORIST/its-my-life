import photosLoad from './photos-upload';
import {call, put, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {cloneableGenerator} from 'redux-saga/utils';
import {setProgress, setStatus} from '../actions/photos-upload';
import {addPhoto} from '../actions/photos';

describe('sagas photos-load', () => {
  const id = 'asdqwexasd';
  const formData = new FormData();
  const url = '/photos';
  const channel = eventChannel(() => {return () => {};});

  describe('uploadAttach()', () => {
    it('should return eventChannel', () => {
      const uploadAttach = photosLoad.__get__('uploadAttach');

      expect(JSON.stringify(uploadAttach(url, formData))).toEqual(
        JSON.stringify(channel)
      );
    });
  });

  describe('progress()', () => {
    const progress = photosLoad.__get__('progress');

    it('should return 80', () => {
      const progressEvent = {
        loaded: 540672,
        total: 669007,
      };
      expect(progress(progressEvent)).toBe(80);
    });

    it('should return 100', () => {
      const progressEvent = {
        loaded: 669007,
        total: 669007,
      };
      expect(progress(progressEvent)).toBe(100);
    });
  });

  describe('uploadPhotoSaga()', () => {
    const generator = cloneableGenerator(photosLoad.__get__('uploadPhotoSaga'))(id, formData);
    const gen1 = generator.clone();
    const uploadAttach = photosLoad.__get__('uploadAttach');
    const progress = 100;
    const response = {data: {}};

    it('should create channel', () => {
      expect(gen1.next().value).toEqual(call(uploadAttach, url, formData));
    });

    it('should take channel', () => {
      const expected = gen1.next(channel).value;
      expect(JSON.stringify(expected)).toEqual(JSON.stringify(take(channel)));
    });

    it('should call action setProgress, if progress not empty', function () {
      expect(gen1.next({progress, response}).value).toEqual(put(setProgress(id, progress)));
    });

    it('should call setStatus, if progress not empty ', () => {
      expect(gen1.next().value).toEqual(put(setStatus(id, true)));
    });

    it('should call addPhoto, if progress not empty ', () => {
      expect(gen1.next().value).toEqual(put(addPhoto(response.data)));
    });

    it('should call action setStatus false, if throw error', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(setStatus(id, false)));
    });
  });

  describe('loadFilesSaga()', () => {
    const dataPhotos = [
      {id: '01', formData},
      {id: '02', formData}
    ];
    const generator = cloneableGenerator(photosLoad.__get__('loadFilesSaga'))({dataPhotos});

    it('should call saga uploadPhotoSaga 01', function () {
      const uploadPhotoSaga = photosLoad.__get__('uploadPhotoSaga');
      const photo = dataPhotos[0];
      expect(generator.next().value).toEqual(call(uploadPhotoSaga, photo.id, photo.formData));
    });

    it('should call saga uploadPhotoSaga 02', function () {
      const uploadPhotoSaga = photosLoad.__get__('uploadPhotoSaga');
      const photo = dataPhotos[1];
      expect(generator.next().value).toEqual(call(uploadPhotoSaga, photo.id, photo.formData));
    });

    it('should be done', () => {
      generator.next();
      expect(generator.next().done).toEqual(true);
    });
  });

  describe('loadFileConfig()', () => {
    const loadFileConfig = photosLoad.__get__('loadFileConfig');
    let emitter = jest.fn();

    it('should return object', function () {
      const expected = {
        onUploadProgress: expect.any(Function),
      };

      expect(loadFileConfig(emitter)).toMatchObject(expected);
    });
  });
});