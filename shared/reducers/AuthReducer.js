import * as AuthConstants from '../constants/AuthConstants'

const defaultState = {
  accessToken: '',
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

      return Object.assign({}, state, {
        accessToken: accessToken,
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
