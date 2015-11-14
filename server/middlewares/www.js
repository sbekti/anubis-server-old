import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import createLocation from 'history/lib/createLocation'
import routes from '../../shared/routes'

import { Provider } from 'react-redux'
import configureStore from '../../shared/store/configureStore'

import { prefetchComponentData } from '../utils/PrefetchUtils'

function handleRequest(req, res) {
  const location = createLocation(req.url)
  const store = configureStore()

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      prefetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => {
          console.log('Prefetch finished!')

          const InitialComponent = (
            <Provider store={store}>
              <RoutingContext {...renderProps} />
            </Provider>
          )

          const component = renderToString(InitialComponent)
          const initialState = store.getState()

          renderProps.routes.filter(route => {
            if (route.status == 404) res.status(404)
          })

          res.render('index', {
            component: component,
            initialState: JSON.stringify(initialState)
          })
        })
      .catch(() => {
        res.status(500).send('Internal Server Error')
      })
    } else {
      res.status(404).send('Not Found')
    }
  })
}

export default handleRequest
