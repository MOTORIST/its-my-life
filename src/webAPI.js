import axios from 'axios';
import history from './history';
import {put} from 'redux-saga/effects';
import {loaderEnd, loaderStart} from './actions/common';
import config from './config';

export const GET = 'GET';
export const POST = 'POST';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

const initAxios = () => {
  const instance = axios.create({
    baseURL: config.API_URL,
  });

  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.isAuth) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`;
  }

  return instance;
};

const handleErrors = (e) => {
  switch(e.response.status) {
    case 404:
      history.push('/not-found');
      break;
    case 401:
      history.push('/sign-in');
      break;
    case 422:
      throw e;
    default:
      throw e;
  }
};

function* webAPI (url, method, data, config = {}) {
  try{
    yield put(loaderStart());

    switch (method) {
      case GET:
        return yield initAxios().get(url, config).catch(handleErrors);
      case POST:
        return yield initAxios().post(url, data, config).catch(handleErrors);
      case PATCH:
        return yield initAxios().patch(url, data, config).catch(handleErrors);
      case DELETE:
        return yield initAxios().delete(url).catch(handleErrors);
      default:
        return yield initAxios().get(url, config).catch(handleErrors);
    }
  } catch (e) {
    throw e;
  } finally {
    yield put(loaderEnd());
  }
}

export function loadFile (url, data, config = {}) {
  return initAxios().post(url, data, config).catch(handleErrors);
}

export default webAPI;