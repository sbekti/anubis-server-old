import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

const promise = promiseMiddleware()

const logger = createLogger({
  logger: console
})

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  promise,
  logger
)(createStore)

export default function configureStore(initialState) {
  if (initialState) {
    return createStoreWithMiddleware(rootReducer, initialState)
  } else {
    return createStoreWithMiddleware(rootReducer)
  }
}
