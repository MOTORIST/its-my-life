import {EDIT_USER, FETCH_USER, FORGOT_PASSWORD, LOGIN, LOGOUT, SUCCESS} from '../constants/ActionTypes';

export function login(email, password, rememberMe = false, goBack = null) {
  return {
    type: LOGIN,
    email: email,
    password: password,
    rememberMe: rememberMe,
    goBack: goBack,
  }
}

export function loginSuccess(access_token, name, avatar = null, group = null) {
  return {
    type: LOGIN + SUCCESS,
    payload: {
      name: name,
      access_token: access_token,
      avatar: avatar,
      group: group,
    }
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function logoutSuccess() {
  return {
    type: LOGOUT + SUCCESS,
  }
}

export function fetchUser() {
  return {
    type: FETCH_USER,
  }
}

export function fetchUserSuccess(profile) {
  return {
    type: FETCH_USER + SUCCESS,
    payload: profile
  }
}

export function editUser(values) {
  return {
    type: EDIT_USER,
    values: values,
  }
}

export function editUserSuccess(profile) {
  return {
    type: EDIT_USER + SUCCESS,
    payload: profile,
  }
}

export function forgotPassword(email) {
  return {
    type: FORGOT_PASSWORD,
    email: email,
  }
}