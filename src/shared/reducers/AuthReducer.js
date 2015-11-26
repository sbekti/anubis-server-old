import Cookies from 'cookies-js'
import * as AuthConstants from '../constants/AuthConstants'

const defaultState = {
  userId: 0,
  accessToken: '',
  isSignedIn: false,
  isSignInRequesting: false,
  hasSignInCompleted: false,
  signInErrors: [],
  isSignUpRequesting: false,
  hasSignUpCompleted: false,
  signUpErrors: []
}

export default function auth(state = defaultState, action) {

  switch (action.type) {

    case AuthConstants.AUTH_SIGN_IN_PENDING: {
      return Object.assign({}, state, {
        isSignInRequesting: true
      })
    }

    case AuthConstants.AUTH_SIGN_IN_FULFILLED: {
      const { userId, accessToken } = action.payload.data

      Cookies.set('access_token', accessToken)

      return Object.assign({}, state, {
        userId: userId,
        accessToken: accessToken,
        isSignedIn: true,
        isSignInRequesting: false,
        hasSignInCompleted: true,
        signInErrors: []
      })
    }

    case AuthConstants.AUTH_SIGN_IN_REJECTED: {
      const errors = action.payload.data.errors
      const errorMessages = typeof(errors) !== 'undefined' ?
        errors : [`Error ${action.payload.status}: ${action.payload.statusText}`]

      return Object.assign({}, state, {
        signInErrors: errorMessages,
        isSignInRequesting: false
      })
    }

    case AuthConstants.AUTH_RESET_SIGN_IN_COMPLETED_FLAG: {
      return Object.assign({}, state, {
        hasSignInCompleted: false
      })
    }

    case AuthConstants.AUTH_SIGN_UP_PENDING: {
      return Object.assign({}, state, {
        isSignUpRequesting: true
      })
    }

    case AuthConstants.AUTH_SIGN_UP_FULFILLED: {
      return Object.assign({}, state, {
        isSignUpRequesting: false,
        hasSignUpCompleted: true,
        signUpErrors: []
      })
    }

    case AuthConstants.AUTH_SIGN_UP_REJECTED: {
      const errors = action.payload.data.errors
      const errorMessages = typeof(errors) !== 'undefined' ?
        errors : [`Error ${action.payload.status}: ${action.payload.statusText}`]

      return Object.assign({}, state, {
        signUpErrors: errorMessages,
        isSignUpRequesting: false
      })
    }

    case AuthConstants.AUTH_RESET_SIGN_UP_COMPLETED_FLAG: {
      return Object.assign({}, state, {
        hasSignUpCompleted: false
      })
    }

    case AuthConstants.AUTH_SIGN_OUT: {
      Cookies.expire('access_token')

      return Object.assign({}, state, {
        userId: 0,
        accessToken: '',
        isSignedIn: false
      })
    }

    case AuthConstants.AUTH_INJECT_ACCESS_TOKEN: {
      return Object.assign({}, state, {
        userId: action.decodedToken.id,
        accessToken: action.accessToken,
        isSignedIn: true
      })
    }

    default: {
      return state
    }

  }

}
