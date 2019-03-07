import user, {user as userReducer} from './user';
import {EDIT_USER, FETCH_USER, LOGIN, LOGOUT, SUCCESS} from '../constants/ActionTypes';

describe('reducer user', () => {
  beforeEach(() => {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  });

  const UserRecord = user.__get__('UserRecord');
  const getUserLocalStorage = user.__get__('getUserLocalStorage');
  const setUserLocalStorage = user.__get__('setUserLocalStorage');
  const removeUserLocalStorage = user.__get__('removeUserLocalStorage');
  const updateUserLocalStorage = user.__get__('updateUserLocalStorage');
  const defaultState = user.__get__('defaultState');
  const userData = {
    isAuth: true,
    name: 'test',
    access_token: 'token',
    avatar: null,
    group: null,
  };

  it('getUserLocalStorage', () => {
    localStorage.setItem('user', JSON.stringify(userData));
    expect(getUserLocalStorage()).toEqual(userData);
  });

  it('setUserLocalStorage', () => {
    setUserLocalStorage(userData);
    expect(getUserLocalStorage()).toEqual(userData);
  });

  it('removeUserLocalStorage', () => {
    setUserLocalStorage(userData);
    removeUserLocalStorage();
    expect(getUserLocalStorage()).toEqual(null);
  });

  it('updateUserLocalStorage', () => {
    const newUserData = {
      isAuth: true,
      name: 'New name',
      access_token: 'token',
      avatar: null,
      group: null,
    };

    setUserLocalStorage(userData);
    updateUserLocalStorage(newUserData);

    expect(getUserLocalStorage()).toEqual(newUserData);
  });

  describe('setDefaultState', () => {
    const setDefaultState = user.__get__('setDefaultState');

    it('if is set user to local storage', () => {
      const expected = new  UserRecord(userData);
      expect(setDefaultState(userData)).toEqual(expected);
    });

    it('if is not set user to local storage', () => {
      const expected = new  UserRecord();
      expect(setDefaultState(null)).toEqual(expected);
    });
  });

  it(FETCH_USER + SUCCESS, () => {
    const action = {
      type: FETCH_USER + SUCCESS,
      payload: {
        name: 'User name',
        access_token: 'token',
        avatar: null,
        group: null,
      },
    };

    const nextState = userReducer(defaultState, action);
    const expected = new UserRecord({
      ...action.payload,
      isAuth: true,
    });

    expect(nextState).toEqual(expected);
  });

  it(EDIT_USER + SUCCESS, () => {
    const newUser = {name: 'New name'};
    const action = {
      type: EDIT_USER + SUCCESS,
      payload: newUser,
    };

    const nextState = userReducer(defaultState, action);
    const expected = new UserRecord({name: 'New name'});

    expect(nextState).toEqual(expected);
  });

  it(LOGIN + SUCCESS, () => {
    const action = {
      type: LOGIN + SUCCESS,
      payload: {
        name: 'test',
        access_token: 'token',
        avatar: null,
        group: null,
      }
    };

    const expected = new UserRecord({
      ...action.payload,
      isAuth: true
    });

    expect(userReducer(defaultState, action)).toEqual(expected);
  });

  it(LOGOUT + SUCCESS, () => {
    const action = {
      type: LOGOUT + SUCCESS,
    };

    const state = new UserRecord({
      name: 'test',
      access_token: 'token',
      avatar: null,
      group: null,
    });

    const expected = new UserRecord();

    expect(userReducer(state, action)).toEqual(expected);
  });
});