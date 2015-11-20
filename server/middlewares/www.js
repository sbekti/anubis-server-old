import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux'
import { createLocation } from 'history'

import routes from '../../shared/routes'
import configureStore from '../../shared/store/configureStore'
import { prefetchComponentData } from '../utils/PrefetchUtils'
import { createInitialStateWithAuth } from '../utils/AuthInjector'

function handleRequest(req, res) {
  console.log(req.cookies)

  const location = createLocation(req.url)
  const initialState = createInitialStateWithAuth(req.cookies)
  const store = configureStore(initialState)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const { dispatch } = store

      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        dispatch
      }

      prefetchComponentData(renderProps.components, locals)
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
        .catch(err => {
          console.log(err)
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
