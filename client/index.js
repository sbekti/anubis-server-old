import React from 'react'
import { match, Router } from 'react-router'
import { render } from 'react-dom'
import { createHistory } from 'history'
import routes from '../shared/routes'

import { Provider } from 'react-redux';
import configureStore from '../shared/store/configureStore'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

const initialState = window.__INITIAL_STATE__;
const store = configureStore()

match({ routes, location }, () => {
  render(
    <Provider store={store}>
      <Router routes={routes} history={createHistory()} />
    </Provider>,
    document.getElementById('app')
  )
})
