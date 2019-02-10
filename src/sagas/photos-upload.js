import {END, eventChannel} from 'redux-saga';
import {all, call, put, take, takeLatest} from 'redux-saga/effects';
import {loadFile} from '../webAPI';
import {UPLOAD_PHOTOS} from "../constants/ActionTypes";
import {setProgress, setStatus} from '../actions/photos-upload';
import {addPhoto} from '../actions/photos';

/**
 * @param url string
 * @param file FormData with key photo
 * @returns {Channel<any>}
 */
function uploadAttach(url, file) {
  return eventChannel(emitter => {
    const config = loadFileConfig(emitter);
    uploadPhoto(url, file, config, emitter);
    return () => {};
  });
}

function uploadPhoto(url, file, config, emitter) {
  loadFile(url, file, config)
    .then(({data}) => {
      emitter({response: data});
      emitter(END);
    })
    .catch(err => {
      emitter(err);
    });
}

function progress(progressEvent) {
  return Math.floor(progressEvent.loaded * 100 / progressEvent.total);
}

function loadFileConfig(emitter) {
  return {
    onUploadProgress: progressEvent => emitter({progress: progress(progressEvent)}),
  }
}

function* uploadPhotoSaga(id, formData) {
  try {
    const channel = yield call(uploadAttach, '/photos', formData);

    while (channel) {
      const {progress, response} = yield take(channel);

      if(progress) {
        yield put(setProgress(id, progress));

        if(progress === 100) {
          yield put(setStatus(id, true));
        }
      }

      if(response && response.data) {
        yield put(addPhoto(response.data));
      }
    }
  } catch (e) {
    yield put(setStatus(id, false));
  }
}

function* uploadFilesSaga({dataPhotos}) {
  for(let photo of dataPhotos) {
    yield call(uploadPhotoSaga, photo.id, photo.formData);
  }
}

function* watchUploadPhotosSagas() {
  yield all([
    takeLatest(UPLOAD_PHOTOS, uploadFilesSaga),
  ]);
}

export default watchUploadPhotosSagas;