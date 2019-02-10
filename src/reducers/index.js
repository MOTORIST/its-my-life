import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form/immutable';
import {common} from './common';
import {user} from './user';
import {albums} from './albums';
import {photos} from './photos';
import {photosUpload} from './photos-upload';

const rootReducer = combineReducers({
  form,
  common,
  user,
  albums,
  photos,
  photosUpload,
});

export default rootReducer;
