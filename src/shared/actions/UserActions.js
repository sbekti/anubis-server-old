import request from 'axios'
import { normalizeURL } from '../utils/URLUtils'
import middlewaresConfig from '../../server/config/middlewares'
import * as UserConstants from '../constants/UserConstants'

const API_BASE_URL = normalizeURL(middlewaresConfig.API_USERS_ENDPOINT)

export function fetchUserDetails(id) {
  return (dispatch, getState) => {
    const storeState = getState()
    const accessToken = storeState.auth.accessToken

    return dispatch({
      type: UserConstants.USER_FETCH_DETAILS,
      payload: {
        promise: request.get(API_BASE_URL + `/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}`}
        })
      }
    })
  }
}

export function clearUserDetails() {
  return {
    type: UserConstants.USER_CLEAR_DETAILS
  }
}
