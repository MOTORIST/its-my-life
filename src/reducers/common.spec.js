import common, {common as commonReducer, SnackbarRecord} from './common';
import {LOADER_END, LOADER_START, SNACKBAR_CLOSE, SNACKBAR_OPEN} from '../constants/ActionTypes';
import {Map} from "immutable";

describe('reducer common', () => {
  const defaultState = common.__get__('defaultState');

  it('should return default state', () => {
    expect(commonReducer(undefined, {})).toEqual(defaultState);
  });

  it(LOADER_START, () => {
    const action = {
      type: LOADER_START,
    };

    expect(commonReducer(defaultState, action).get('loader')).toBe(true);
  });

  it(LOADER_END, () => {
    const action = {
      type: LOADER_END,
    };

    const state = defaultState.set('loader', true);

    expect(commonReducer(state, action).get('loader')).toBe(false);
  });

  it(SNACKBAR_OPEN, () => {
    const action = {
      type: SNACKBAR_OPEN,
      payload: {
        variant: 'success',
        message: 'test',
      },
    };

    const expected = new SnackbarRecord({
      open: true,
      settings: new Map({
        variant: 'success',
        duration: 5000,
        vertical: 'top',
        horizontal: 'center',
        message: 'test',
      }),
    });

    const nextState = commonReducer(defaultState, action);

    expect(nextState.get('snackbar')).toEqual(expected);
  });

  it(SNACKBAR_CLOSE, () => {
    const action = {
      type: SNACKBAR_CLOSE,
    };

    const expected = new SnackbarRecord();
    const nextState = commonReducer(defaultState, action);

    expect(nextState.get('snackbar')).toEqual(expected);
  });
});