import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SignIn from '../pages/sign-in';

function Router() {
  return (
    <Switch>
      <Route path='/sign-in' component={SignIn}/>
    </Switch>
  );
}

export default Router;