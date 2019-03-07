import {EDIT_USER, FETCH_USER, LOGIN, LOGOUT, SUCCESS} from '../constants/ActionTypes';
import {Record} from 'immutable';

const UserRecord = new Record({
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
  return userLocalStorage ? new UserRecord(userLocalStorage) : new UserRecord();
}

const defaultState = setDefaultState(getUserLocalStorage());

export function user(state = defaultState, action) {
  const {type, payload} = action;

  switch (type) {
    case FETCH_USER + SUCCESS:
      return state.merge(payload).set('isAuth', true);
    case EDIT_USER + SUCCESS:
      updateUserLocalStorage(payload);
      console.log('---- state.merge(payload);');
      return state.merge(payload);
    case LOGIN + SUCCESS:
      const user = {
        isAuth: true,
        name: payload.name,
        access_token: payload.access_token
      };
      setUserLocalStorage(user);
      return new UserRecord(user);
    case LOGOUT + SUCCESS:
      removeUserLocalStorage();
      return new UserRecord();
    default:
      return state;
  }
}
export default user;