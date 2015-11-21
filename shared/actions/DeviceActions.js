import request from 'axios'
import { normalizeURL } from '../utils/URLUtils'
import middlewaresConfig from '../../server/config/middlewares'
import * as DeviceConstants from '../constants/DeviceConstants'

const API_BASE_URL = normalizeURL(middlewaresConfig.API_DEVICES_ENDPOINT)

function shouldFetchAllDevices(storeState) {
  if (storeState.device.isPrefetched) {
    return false
  }

  if (storeState.device.isFetching) {
    return false
  }

  return true
}

export function fetchAllDevicesIfNeeded() {
  return (dispatch, getState) => {
    const storeState = getState()

    if (!shouldFetchAllDevices(storeState)) {
      console.log('Data is already prefetched. Skipping loading data.')
      return
    }

    dispatch(fetchAllDevices())
  }
}

export function fetchAllDevices() {
  return (dispatch, getState) => {
    const storeState = getState()
    const accessToken = storeState.auth.accessToken

    return dispatch({
      type: DeviceConstants.DEVICE_FETCH_ALL,
      payload: {
        promise: request.get(API_BASE_URL, {
          headers: { 'Authorization': `Bearer ${accessToken}`}
        })
      }
    })
  }
}

export function createDevice(name, state) {
  return (dispatch, getState) => {
    const storeState = getState()
    const accessToken = storeState.auth.accessToken

    return dispatch({
      type: DeviceConstants.DEVICE_CREATE,
      payload: {
        promise: request.post(API_BASE_URL, {
          name: name,
          state: state
        }, {
          headers: { 'Authorization': `Bearer ${accessToken}`}
        })
      },
      meta: {
        name,
        state
      }
    })
  }
}

export function editDevice(id, name, state) {
  return (dispatch, getState) => {
    const storeState = getState()
    const accessToken = storeState.auth.accessToken

    return dispatch({
      type: DeviceConstants.DEVICE_EDIT,
      payload: {
        promise: request.put(API_BASE_URL + `/${id}`, {
          name: name,
          state: state
        }, {
          headers: { 'Authorization': `Bearer ${accessToken}`}
        })
      },
      meta: {
        id,
        name,
        state
      }
    })
  }
}

export function deleteDevice(id) {
  return (dispatch, getState) => {
    const storeState = getState()
    const accessToken = storeState.auth.accessToken

    return dispatch({
      type: DeviceConstants.DEVICE_DELETE,
      payload: {
        promise: request.delete(API_BASE_URL + `/${id}`, {
          headers: { 'Authorization': `Bearer ${accessToken}`}
        })
      },
      meta: {
        id
      }
    })
  }
}
