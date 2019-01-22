import {LOADER_END, LOADER_START, SNACKBAR_CLOSE, SNACKBAR_OPEN,} from '../constants/ActionTypes';
import {Map, Record} from 'immutable';

export const SnackbarRecord = new Record({
  open: false,
  settings: new Map({
    variant: 'default',
    duration: 5000,
    vertical: 'top',
    horizontal: 'center',
    message: '',
  }),
});

const CommonRecord = new Record({
  loader: false,
  snackbar: new SnackbarRecord(),
});

export const defaultState = new CommonRecord();

export function common(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOADER_START:
      return state.setIn(['loader'], true);
    case LOADER_END:
      return state.setIn(['loader'], false);
    case SNACKBAR_OPEN:
      return state.set('snackbar', (new SnackbarRecord({open: true}).mergeIn(['settings'], payload)));
    case SNACKBAR_CLOSE:
      return state.set('snackbar', new SnackbarRecord());
    default:
      return state;
  }
}