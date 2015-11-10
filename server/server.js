import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import serveFavicon from 'serve-favicon'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RoutingContext } from 'react-router'
import createLocation from 'history/lib/createLocation'
import routes from '../shared/routes'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from '../shared/reducers'

const app = express()

app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST || '0.0.0.0')
app.set('port', process.env.PORT || 3000)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
//app.use(serveFavicon(`${assetsPath}/assets/favicon.png`))
app.use(express.static(path.join(__dirname, '../assets')))

app.get('*', (req, res) => {
  const location = createLocation(req.url)
  const reducer = combineReducers(reducers)
  const store = createStore(reducer)

  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const InitialComponent = (
        <Provider store={store}>
          <RoutingContext {...renderProps} />
        </Provider>
      )

      const component = renderToString(InitialComponent)
      const initialState = store.getState()

      res.render('index', {
        component: component,
        initialState: JSON.stringify(initialState)
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.use((err, req, res, next) => {
  console.log('Error on request %s %s', req.method, req.url)
  console.log(err)
  console.log(err.stack)
  res.status(500).send('Internal server error')
})

const server = app.listen(app.get('port'), () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Server is running at http://${host}:${port}`)
})
