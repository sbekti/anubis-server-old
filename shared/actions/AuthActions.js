import request from 'axios'
import { normalizeURL } from '../utils/URLUtils'
import middlewaresConfig from '../../server/config/middlewares'
import * as AuthConstants from '../constants/AuthConstants'

const API_BASE_URL = normalizeURL(middlewaresConfig.API_USERS_ENDPOINT)

export function signIn(email, password) {
  return {
    type: AuthConstants.AUTH_SIGN_IN,
    payload: {
      promise: request.post(API_BASE_URL + '/signin', {
        email: email,
        password: password
      })
    }
  }
}
