import {createStore, applyMiddleware} from 'redux';
import {compose} from 'recompose';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;