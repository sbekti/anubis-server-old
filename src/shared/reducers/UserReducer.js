import * as UserConstants from '../constants/UserConstants'

const defaultState = {
  isPrefetched: false,
  isRequesting: false,
  details: {}
}

export default function user(state = defaultState, action) {

  switch (action.type) {

    case UserConstants.USER_FETCH_PENDING: {
      return Object.assign({}, state, {
        isRequesting: true
      })
    }

    case UserConstants.USER_FETCH_FULFILLED: {
      return Object.assign({}, state, {
        details: action.payload.data,
        isRequesting: false
      })
    }

    case UserConstants.USER_FETCH_REJECTED: {
      return Object.assign({}, state, {
        isRequesting: false
      })
    }

    case UserConstants.USER_UPDATE_PENDING: {
      return Object.assign({}, state, {
        isRequesting: true
      })
    }

    case UserConstants.USER_UPDATE_FULFILLED: {
      return Object.assign({}, state, {
        details: Object.assign({}, state.details, {
          name: action.meta.name,
          email: action.meta.email
        }),
        isRequesting: false
      })
    }

    case UserConstants.USER_UPDATE_REJECTED: {
      return Object.assign({}, state, {
        isRequesting: false
      })
    }

    case UserConstants.USER_CLEAR: {
      return Object.assign({}, state, {
        details: {}
      })
    }

    default: {
      return state
    }

  }

}
