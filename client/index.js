import React from 'react'
import { match, Router } from 'react-router'
import { render } from 'react-dom'
import { createHistory } from 'history'
import routes from '../shared/routes'

import { Provider } from 'react-redux';
import configureStore from '../shared/store/configureStore'
import rehydrateStore from '../shared/store/rehydrateStore'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

const initialState = rehydrateStore(window.__INITIAL_STATE__)
const store = configureStore(initialState)

match({ routes, location }, () => {
  render(
    <Provider store={store}>
      <Router routes={routes} history={createHistory()} />
    </Provider>,
    document.getElementById('root')
  )
})
