import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import HomePage from './components/home/HomePage'
import DevicePage from './components/device/DevicePage'
import SignInPage from './components/signin/SignInPage'
import NotFoundPage from './components/common/NotFoundPage'
import AuthUtils from './utils/AuthUtils'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='devices' component={DevicePage}
      onEnter={AuthUtils.checkCredentials}
    />
    <Route path='auth/signin' component={SignInPage} />
    <Route path='*' component={NotFoundPage} status={404} />
  </Route>
)
