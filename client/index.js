import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { createHistory } from 'history'
import FastClick from 'fastclick'

import { configureRoutes } from '../shared/routes'
import configureStore from '../shared/store/configureStore'
import rehydrateStore from '../shared/store/rehydrateStore'

const initialState = rehydrateStore(window.__INITIAL_STATE__)
const store = configureStore(initialState)
const routes = configureRoutes(store)
const history = createHistory()

FastClick.attach(document.body)

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('root')
)
