import {EDIT_USER, FETCH_USER, LOGIN, LOGOUT, SUCCESS} from '../constants/ActionTypes';
import {Record} from 'immutable';

const UserRecord = new Record({
  isAuth: true,
  name: null,
  access_token: null,
  avatar: null,
  group: null,
  email: null,
});

export const EditUserRecord = new Record({
  isAuth: false,
  name: null,
  access_token: null,
  avatar: null,
  group: null,
  email: null,
  password_confirmation: null,
  password: null,
});

function getUserLocalStorage() {
  return JSON.parse(localStorage.getItem('user'));
}

function setUserLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function removeUserLocalStorage() {
  localStorage.removeItem('user');
}

function updateUserLocalStorage(user) {
  const oldUser = getUserLocalStorage();
  const newUser = {
    ...oldUser,
    ...user,
  };

  setUserLocalStorage(newUser);
}

function setDefaultState(userLocalStorage) {
  return userLocalStorage ? new UserRecord(userLocalStorage) : new UserRecord({isAuth: false});
}

const defaultState = setDefaultState(getUserLocalStorage());

export function user(state = defaultState, action) {
  const {type, payload} = action;

  switch (type) {
    case FETCH_USER + SUCCESS:
      return state.merge(payload).set('isAuth', true);
    case EDIT_USER + SUCCESS:
      const editUser = new UserRecord(payload);
      updateUserLocalStorage(editUser.toJS());
      return state.merge(new UserRecord(payload));
    case LOGIN + SUCCESS:
      const user = new UserRecord(payload);
      setUserLocalStorage(user.toJS());
      return user;
    case LOGOUT + SUCCESS:
      removeUserLocalStorage();
      return new UserRecord({isAuth: false});
    default:
      return state;
  }
}
export default user;