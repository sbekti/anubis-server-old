import request from 'axios'
import * as AuthConstants from '../constants/AuthConstants'

const API_BASE_URL = '/api/v1/auth'

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
