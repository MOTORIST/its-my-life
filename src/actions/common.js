import {LOADER_END, LOADER_START, SNACKBAR_CLOSE, SNACKBAR_OPEN,} from '../constants/ActionTypes';

export function loaderStart() {
  return {
    type: LOADER_START,
  }
}

export function loaderEnd() {
  return {
    type: LOADER_END,
  }
}

export function snackbarError(message) {
  return {
    type: SNACKBAR_OPEN,
    payload: {
      variant: 'error',
      message: message,
    },
  };
}

export function snackbarSuccess(message) {
  return {
    type: SNACKBAR_OPEN,
    payload: {
      variant: 'success',
      message: message,
    },
  };
}

export function snackbarClose() {
  return {
    type: SNACKBAR_CLOSE,
  }
}