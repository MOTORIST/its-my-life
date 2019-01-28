import user from './user';
import {call, put} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';
import webAPI, {POST} from '../webAPI';
import {loginSuccess, logoutSuccess} from '../actions/user';
import history from '../history';
import {snackbarError} from '../actions/common';

describe('sagas user', () => {
  describe('loginSaga()', () => {
    const email = 'test@test.com';
    const password = 'quwerty';
    const rememberMe = false;
    const dataForm = {
      email: email,
      password: password,
      remember_me: rememberMe,
    };
    const generator = cloneableGenerator(user.__get__('loginSaga'))({email, password, rememberMe});
    const gen1 = generator.clone();

    it('should login (api)', () => {
      expect(gen1.next().value).toEqual(call(webAPI, '/login', POST,  dataForm));
    });

    describe('if access_token && username', () => {
      it('should call action loginSuccess', () => {
        const access_token = 'asdasdasd';
        const username = 'admin';
        const response = {
          data: {
            access_token,
            username,
          }
        };

        expect(gen1.next(response).value).toEqual(put(loginSuccess(access_token, username)));
      });

      describe('if history.length <= 2', () => {
        it('should go to main page ', () => {
          const gen2 = gen1.clone();
          expect(gen2.next().value).toEqual(call(history.push, '/'));
        });
      });

      describe('if history.length > 2', () => {
        it('should go back page ', () => {
          history.length = 3;
          expect(gen1.next().value).toEqual(put(history.goBack));
        });
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
});