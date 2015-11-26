import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from './promiseMiddleware'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const logger = createLogger({
    logger: console
  })

  const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    logger
  )(createStore)

  if (initialState) {
    return createStoreWithMiddleware(rootReducer, initialState)
  } else {
    return createStoreWithMiddleware(rootReducer)
  }
}
