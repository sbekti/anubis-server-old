import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import createLocation from 'history/lib/createLocation'
import routes from '../../shared/routes'

import { Provider } from 'react-redux'
import configureStore from '../../shared/store/configureStore'

import { fetchComponentData } from '../utils/PrefetchUtil'

function handleRequest(req, res) {
  const location = createLocation(req.url)
  const store = configureStore()

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => {
          const InitialComponent = (
            <Provider store={store}>
              <RoutingContext {...renderProps} />
            </Provider>
          )

          const component = renderToString(InitialComponent)
          const initialState = store.getState()
          
          console.log('finisheddd!!')

          renderProps.routes.filter(route => {
            if (route.status == 404) res.status(404)
          })

          res.render('index', {
            component: component,
            initialState: JSON.stringify(initialState)
          })
        })
    } else {
      res.status(404).send('Not found')
    }
  })
}

export default handleRequest
