import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginPage from './components/auth/LoginPage';
import NotFoundPage from './components/common/NotFoundPage';

export default (
  <Route component={App}>
    <Route path='/' component={HomePage} onEnter={HomePage.onEnter} />
    <Route path='/login' component={LoginPage} />
    <Route path='*' component={NotFoundPage} />
  </Route>
)
