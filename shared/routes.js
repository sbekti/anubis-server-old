import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import AuthUtility from './components/common/AuthUtility';
import HomePage from './components/home/HomePage';
import DevicePage from './components/device/DevicePage';
import LoginPage from './components/auth/LoginPage';
import NotFoundPage from './components/common/NotFoundPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='devices' component={DevicePage}
      onEnter={AuthUtility.checkCredentials}
    />
    <Route path='auth/login' component={LoginPage} />
    <Route path='*' component={NotFoundPage} status={404} />
  </Route>
)
