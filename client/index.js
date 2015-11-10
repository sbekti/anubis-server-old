import React from 'react'
import { match, Router } from 'react-router'
import { render } from 'react-dom'
import { createHistory } from 'history'
import routes from '../shared/routes'

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../shared/reducers';
import { fromJS } from 'immutable';

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

const initialState = window.__INITIAL_STATE__;

Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key])
  });

const reducer = combineReducers(reducers)
const store = createStore(reducer, initialState)

match({ routes, location }, () => {
  render(
    <Provider store={store}>
      <Router routes={routes} history={createHistory()} />
    </Provider>,
    document.getElementById('app')
  )
})
