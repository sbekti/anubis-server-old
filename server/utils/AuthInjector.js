import jwt from 'jsonwebtoken'
import { createStore } from 'redux'

import config from '../config/auth'
import rootReducer from '../../shared/reducers'

export function createInitialStateWithAuth(cookies) {
  const initialState = createStore(rootReducer).getState()
  const accessToken = cookies.access_token

  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, config.JWT_SECRET_KEY)

      Object.assign(initialState.auth, {
        accessToken: accessToken,
        isAuthenticated: true
      })
    } catch (err) {
      Object.assign(initialState.auth, {
        accessToken: '',
        isAuthenticated: false
      })
    }
  }

  return initialState
}
