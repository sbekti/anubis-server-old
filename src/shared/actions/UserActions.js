import request from 'axios'
import { normalizeURL } from '../utils/URLUtils'
import middlewaresConfig from '../../server/config/middlewares'
import * as UserConstants from '../constants/UserConstants'

const API_BASE_URL = normalizeURL(middlewaresConfig.API_USERS_ENDPOINT)

export function fetchUser(id) {
  return (dispatch, getState) => {
    const storeState = getState()
    const accessToken = storeState.auth.accessToken

    return dispatch({
      type: UserConstants.USER_FETCH,
      payload: {
        promise: request.get(API_BASE_URL + `/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}`}
        })
      }
    })
  }
}

export function updateUser(id, name, email, password) {
  return (dispatch, getState) => {
    const storeState = getState()
    const accessToken = storeState.auth.accessToken

    let requestBody = {
      name: name,
      email: email
    }

    if (password.length > 0) {
      requestBody.password = password
    }

    return dispatch({
      type: UserConstants.USER_UPDATE,
      payload: {
        promise: request.put(API_BASE_URL + `/${id}`, requestBody, {
          headers: { 'Authorization': `Bearer ${accessToken}`}
        })
      },
      meta: {
        id,
        name: name,
        email: email
      }
    })
  }
}

export function clearUser() {
  return {
    type: UserConstants.USER_CLEAR
  }
}
