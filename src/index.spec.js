import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import App from './App';
import history from './history';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const appWrapper = (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
  ReactDOM.render(appWrapper, div);
  ReactDOM.unmountComponentAtNode(div);
});
