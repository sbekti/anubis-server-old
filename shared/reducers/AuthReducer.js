import Cookies from 'cookies-js'
import * as AuthConstants from '../constants/AuthConstants'

const defaultState = {
  accessToken: '',
  isAuthenticated: false,
  isRequesting: false,
  isError: false
}

export default function auth(state = defaultState, action) {

  switch (action.type) {

    case AuthConstants.AUTH_SIGN_IN_PENDING: {
      return Object.assign({}, state, {
        isRequesting: true
      })
    }

    case AuthConstants.AUTH_SIGN_IN_FULFILLED: {
      const accessToken = action.payload.data.access_token

      Cookies.set('access_token', accessToken)

      return Object.assign({}, state, {
        accessToken: accessToken,
        isAuthenticated: true,
        isError: false,
        isRequesting: false
      })
    }

    case AuthConstants.AUTH_SIGN_IN_REJECTED: {
      return Object.assign({}, state, {
        isError: true,
        isRequesting: false
      })
    }

    default: {
      return state
    }

  }

}
