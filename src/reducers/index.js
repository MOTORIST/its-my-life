import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form/immutable';
import {common} from './common';
import {user} from './user';

const rootReducer = combineReducers({
  form,
  common,
  user,
});

export default rootReducer;
