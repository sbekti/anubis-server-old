import * as UserConstants from '../constants/UserConstants'

const defaultState = {
  isPrefetched: false,
  isFetching: false,
  details: {}
}

export default function user(state = defaultState, action) {

  switch (action.type) {

    case UserConstants.USER_FETCH_DETAILS_PENDING: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }

    case UserConstants.USER_FETCH_DETAILS_FULFILLED: {
      return Object.assign({}, state, {
        details: action.payload.data,
        isFetching: false
      })
    }

    case UserConstants.USER_FETCH_DETAILS_REJECTED: {
      return Object.assign({}, state, {
        isFetching: false
      })
    }

    case UserConstants.USER_CLEAR_DETAILS: {
      return Object.assign({}, state, {
        details: {}
      })
    }

    default: {
      return state
    }

  }

}
