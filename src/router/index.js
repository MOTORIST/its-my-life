import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Profile from '../pages/profile';
import ProfileEdit from '../pages/profile-edit';
import ForgotPasswordEdit from '../pages/forgot-password';
import ResetPassword from '../pages/reset-password';
import SignIn from '../pages/sign-in';
import NotFound from '../pages/not-found';
import Albums from '../pages/albums';
import Photos from '../pages/photos';

function Router() {
  return (
    <Switch>
      <Route path='/' component={Albums} exact/>
      <Route path='/albums/:id' component={Photos} exact/>
      <Route path='/sign-in' component={SignIn} exact/>
      <Route path='/profile' component={Profile} exact/>
      <Route path='/profile-edit' component={ProfileEdit} exact/>
      <Route path='/forgot-password' component={ForgotPasswordEdit} exact/>
      <Route path='/reset-password/:token' component={ResetPassword} exact/>
      <Route path='/not-found' component={NotFound} exact/>
      <Route path='*' component={NotFound} />
    </Switch>
  );
}

export default Router;