import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const logger = createLogger({
  logger: console
})

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger,
  promise
)(createStore)

export default function configureStore(initialState) {
  if (initialState) {
    return createStoreWithMiddleware(rootReducer, initialState)
  } else {
    return createStoreWithMiddleware(rootReducer)
  }
}
