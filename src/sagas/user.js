import {snackbarError, snackbarSuccess} from '../actions/common';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import webAPI, {PATCH, POST} from '../webAPI';
import {editUserSuccess, fetchUserSuccess, loginSuccess, logoutSuccess} from '../actions/user';
import {EDIT_USER, FETCH_USER, FORGOT_PASSWORD, LOGIN, LOGOUT, RESET_PASSWORD} from '../constants/ActionTypes';
import history from '../history';

function* loginSaga({email, password}) {
  try {
    const dataForm = {
      email: email,
      password: password,
    };

    const {data: {data: {access_token, name}}} = yield call(webAPI, '/login', POST,  dataForm);

    if(access_token && name) {
      yield put(loginSuccess(access_token, name));
      yield call(history.push, '/');
    }
  } catch (error) {
    const {response} = error;

    if(response && response.status === 401) {
      yield put(snackbarError('Error! Wrong login or password.'));
    } else {
      yield put(snackbarError('Error on site! Failed to sign in.'));
    }
  }
}

function* logoutSaga() {
  try {
    yield call(webAPI, '/logout');
    yield put(logoutSuccess());
    yield call(history.push, '/');
  } catch (error) {
    yield put(snackbarError('Error! Failed to log out.'));
  }
}

function* userSaga() {
  try {
    const dataUser = yield call(webAPI, '/user');

    if(dataUser) {
      yield put(fetchUserSuccess(dataUser.data.data));
    }
  } catch (e) {
    yield put(snackbarError('Error! Unable to load profile.'));
  }
}

function* editUserSaga({values}) {
  try {
    const dataUser = yield call(webAPI, '/user', PATCH, values);

    if(dataUser) {
      yield put(editUserSuccess(dataUser.data.data));
      yield put(snackbarSuccess('Profile changed.'));
      yield call(history.goBack);
    }
  } catch (e) {
    yield put(snackbarError('Error! Unable to edit profile.'));
  }
}

function* forgotPasswordSaga({email}) {
  try {
    yield call(webAPI, '/password/recovery', POST, {email: email});
    yield put(snackbarSuccess(`Recovery letter sent to email ${email}.`));
    yield call(history.push, '/');
  } catch (e) {
    yield put(snackbarError('Error! Recovery letter not sent to email.'));
  }
}

function* resetPasswordSaga({token, password, password_confirmation}) {
  try {
    yield call(webAPI, '/password/reset', POST, {token, password, password_confirmation});
    yield put(snackbarSuccess(`Password changed.`));
    yield call(history.push, '/sign-in');
  } catch (e) {
    yield put(snackbarError('Error! Password failed to change.'));
  }
}

function* watchUserSagas() {
  yield all([
    takeLatest(LOGIN, loginSaga),
    takeLatest(LOGOUT, logoutSaga),
    takeLatest(FETCH_USER, userSaga),
    takeLatest(EDIT_USER, editUserSaga),
    takeLatest(FORGOT_PASSWORD, forgotPasswordSaga),
    takeLatest(RESET_PASSWORD, resetPasswordSaga),
  ]);
}

export default watchUserSagas;