import {createStore, applyMiddleware} from 'redux';
import {compose} from 'recompose';
import reducer from '../reducers';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;