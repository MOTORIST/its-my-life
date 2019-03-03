import user from './user';
import {call, put} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';
import webAPI, {PATCH, POST} from '../webAPI';
import {editUserSuccess, fetchUserSuccess, loginSuccess, logoutSuccess} from '../actions/user';
import history from '../history';
import {snackbarError, snackbarSuccess} from '../actions/common';

describe('sagas user', () => {
  const responseUser = {
    data: {
      data: {
        name: 'name',
        email: 'user@example.com',
      },
    }
  };

  describe('loginSaga()', () => {
    const email = 'test@test.com';
    const password = 'quwerty';
    const dataForm = {
      email: email,
      password: password,
    };
    const generator = cloneableGenerator(user.__get__('loginSaga'))({email, password});
    const gen1 = generator.clone();

    it('should login (api)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, '/login', POST,  dataForm));
    });

    describe('if access_token && username', () => {
      it('should call action loginSuccess', () => {
        const access_token = 'asdasdasd';
        const name = 'admin';
        const response = {
          data: {
            data: {
              access_token,
              name,
            }
          }
        };

        expect(gen1.next(response).value).toEqual(put(loginSuccess(access_token, name)));
      });
    });

    it('should call action snackbarError', () => {
      const gen3 = generator.clone();
      gen3.next();
      expect(gen3.throw(new Error()).value).toEqual(put(snackbarError(('Error on site! Failed to sign in.'))));
    });

    it('should call action snackbarError if error status 401', () => {
      const gen4 = generator.clone();
      const response = {
        response: {
          status: 401,
        }
      };
      gen4.next();
      expect(gen4.throw(response).value).toEqual(put(snackbarError(('Error! Wrong login or password.'))));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('logoutSaga()', () => {
    const generator = cloneableGenerator(user.__get__('logoutSaga'))();
    const gen1 = generator.clone();

    it('should logout (api)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, '/logout'));
    });

    it('should call action logoutSuccess',  () => {
      expect(gen1.next().value).toEqual(put(logoutSuccess()));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Failed to log out.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('userSaga()', () => {
    const generator = cloneableGenerator(user.__get__('userSaga'))();
    const gen1 = generator.clone();

    it('should get user (webAPI)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, '/user'));
    });

    it('should call action fetchUserSuccess', () => {
      expect(gen1.next(responseUser).value).toEqual(put(fetchUserSuccess(responseUser.data.data)));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Unable to load profile.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('editUserSaga()', () => {
    const values = {
      name: 'New Name',
    };
    const generator = cloneableGenerator(user.__get__('editUserSaga'))({values});
    const gen1 = generator.clone();

    it('should call method webAPI PATCH', () => {
      expect(gen1.next().value).toEqual(call(webAPI, '/user', PATCH, values));
    });

    it('should call action editUserSuccess', () => {
      expect(gen1.next(responseUser).value).toEqual(put(editUserSuccess(responseUser.data.data)));
    });

    it('should call action snackbarSuccess', () => {
      expect(gen1.next().value).toEqual(put(snackbarSuccess('Profile changed.')));
    });

    it('should call history goBack', () => {
      expect(gen1.next().value).toEqual(call(history.goBack));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Unable to edit profile.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('forgotPasswordSaga()', () => {
    const email = 'test';
    const generator = cloneableGenerator(user.__get__('forgotPasswordSaga'))({email});
    const gen1 = generator.clone();

    it('should call webAPI method reset password', () => {
      expect(gen1.next().value).toEqual(call(webAPI, '/password/recovery', POST, {email: email}));
    });

    it('should call action snackbarSuccess', () => {
      const message = `Recovery letter sent to email ${email}.`;
      expect(gen1.next().value).toEqual(put(snackbarSuccess(message)));
    });

    it('should redirect to main page', () => {
      expect(gen1.next().value).toEqual(call(history.push, '/'));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Recovery letter not sent to email.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });

  describe('resetPasswordSaga()', () => {
    const token = 'string';
    const password = '123456';
    const generator = cloneableGenerator(user.__get__('resetPasswordSaga'))({token, password, password_confirmation: password});
    const gen1 = generator.clone();

    it('should call webAPI method password reset', () => {
      expect(gen1.next().value).toEqual(call(webAPI, '/password/reset', POST, {token, password, password_confirmation: password}));
    });

    it('should call action snackbarSuccess', () => {
      expect(gen1.next().value).toEqual(put(snackbarSuccess('Password changed.')));
    });

    it('should redirect to sign in page', () => {
      expect(gen1.next().value).toEqual(call(history.push, '/sign-in'));
    });

    it('should call action snackbarError ', () => {
      const gen2 = generator.clone();
      gen2.next();
      expect(gen2.throw(new Error()).value).toEqual(put(snackbarError('Error! Password failed to change.')));
    });

    it('should be done', () => {
      gen1.next();
      expect(gen1.next().done).toEqual(true);
    });
  });
});