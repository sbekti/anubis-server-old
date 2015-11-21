import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './components/App'
import HomePage from './components/home/HomePage'
import DevicePage from './components/device/DevicePage'
import SignInPage from './components/signin/SignInPage'
import NotFoundPage from './components/common/NotFoundPage'

function requireAuth(store) {
  return (nextState, replaceState) => {
    const { auth } = store.getState()

    if (!auth.isAuthenticated) {
      replaceState({ nextPathname: nextState.location.pathname }, '/auth/signin')
    }
  }
}

export function configureRoutes(store) {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={HomePage} />
      <Route path='devices' component={DevicePage} onEnter={requireAuth(store)} />
      <Route path='auth/signin' component={SignInPage} />
      <Route path='*' component={NotFoundPage} status={404} />
    </Route>
  )
}
