import user, {user as userReducer} from './user';
import {LOGIN, LOGOUT, SUCCESS} from '../constants/ActionTypes';

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
  const defaultState = user.__get__('defaultState');
  const userData = {
    isAuth: true,
    username: 'test',
    access_token: 'token',
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

  it(LOGIN + SUCCESS, () => {
    const action = {
      type: LOGIN + SUCCESS,
      payload: {
        username: 'test',
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
      username: 'test',
      access_token: 'token',
      avatar: null,
      group: null,
    });

    const expected = new UserRecord();

    expect(userReducer(state, action)).toEqual(expected);
  });
});