import React, { Component } from 'react';
import Router from './router';
import {Link} from 'react-router-dom';
import withRoot from './theme';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to='sign-in'>Sign in</Link>
        </header>
        <Router />
      </div>
    );
  }
}

export default withRoot(App);
