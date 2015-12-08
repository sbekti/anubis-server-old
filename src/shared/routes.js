import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import App from './components/App'
import HomePage from './components/home/HomePage'
import DevicePage from './components/device/DevicePage'
import DeviceDetailsPage from './components/device/DeviceDetailsPage'
import SignInPage from './components/signin/SignInPage'
import SignUpPage from './components/signup/SignUpPage'
import SignOutPage from './components/signout/SignOutPage'
import SettingsPage from './components/settings/SettingsPage'
import SettingsAccountTab from './components/settings/SettingsAccountTab'
import SettingsEndpointsTab from './components/settings/SettingsEndpointsTab'
import SettingsSecurityTab from './components/settings/SettingsSecurityTab'
import NotFoundPage from './components/common/NotFoundPage'

function requireAuth(store) {
  return (nextState, replaceState) => {
    const { auth } = store.getState()

    if (!auth.isSignedIn) {
      replaceState({ nextPathname: nextState.location.pathname }, '/auth/signin')
    }
  }
}

export function configureRoutes(store) {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={HomePage} />
      <Route path='devices' component={DevicePage} onEnter={requireAuth(store)} />
      <Route path='devices/:id' component={DeviceDetailsPage} onEnter={requireAuth(store)} />
      <Route path='auth/signin' component={SignInPage} />
      <Route path='auth/signup' component={SignUpPage} />
      <Route path='auth/signout' component={SignOutPage} />
      <Redirect from='settings' to='settings/account' />
      <Route path='settings' component={SettingsPage} onEnter={requireAuth(store)}>
        <Route path='account' component={SettingsAccountTab} />
        <Route path='endpoints' component={SettingsEndpointsTab} />
        <Route path='security' component={SettingsSecurityTab} />
      </Route>
      <Route path='*' component={NotFoundPage} status={404} />
    </Route>
  )
}
