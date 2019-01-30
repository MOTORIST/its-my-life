import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form/immutable';
import {common} from './common';
import {user} from './user';
import {albums} from './albums';

const rootReducer = combineReducers({
  form,
  common,
  user,
  albums,
});

export default rootReducer;
