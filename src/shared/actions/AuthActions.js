import request from 'axios'
import { normalizeURL } from '../utils/URLUtils'
import middlewaresConfig from '../../server/config/middlewares'
import * as AuthConstants from '../constants/AuthConstants'

const API_BASE_URL = normalizeURL(middlewaresConfig.API_AUTH_ENDPOINT)

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

export function signUp(name, email, password) {
  return {
    type: AuthConstants.AUTH_SIGN_UP,
    payload: {
      promise: request.post(API_BASE_URL + '/signup', {
        name: name,
        email: email,
        password: password
      })
    }
  }
}

export function signOut() {
  return {
    type: AuthConstants.AUTH_SIGN_OUT
  }
}

export function injectAccessToken(accessToken, decodedToken) {
  return {
    type: AuthConstants.AUTH_INJECT_ACCESS_TOKEN,
    accessToken: accessToken,
    decodedToken: decodedToken
  }
}

export function resetSignInCompletedFlag() {
  return {
    type: AuthConstants.AUTH_RESET_SIGN_IN_COMPLETED_FLAG
  }
}

export function resetSignUpCompletedFlag() {
  return {
    type: AuthConstants.AUTH_RESET_SIGN_UP_COMPLETED_FLAG
  }
}
