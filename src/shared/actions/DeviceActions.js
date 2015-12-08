import request from 'axios'
import { normalizeURL } from '../utils/URLUtils'
import middlewaresConfig from '../../server/config/middlewares'
import * as DeviceConstants from '../constants/DeviceConstants'

const API_BASE_URL = normalizeURL(middlewaresConfig.API_DEVICES_ENDPOINT)

function shouldFetchAllDevices(store) {
  if (store.device.isPrefetched) {
    return false
  }

  if (store.device.isFetching) {
    return false
  }

  return true
}

export function fetchAllDevicesIfNeeded() {
  return (dispatch, getState) => {
    const store = getState()

    if (!shouldFetchAllDevices(store)) {
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

function shouldFetchDeviceDetails(store, id) {
  if (store.device.details.id === parseInt(id)) {
    return false
  }

  return true
}

export function fetchDeviceDetailsIfNeeded(id) {
  return (dispatch, getState) => {
    const store = getState()

    if (!shouldFetchDeviceDetails(store, id)) {
      return
    }

    dispatch(fetchDeviceDetails(id))
  }
}

export function fetchDeviceDetails(id) {
  return (dispatch, getState) => {
    const storeState = getState()
    const accessToken = storeState.auth.accessToken

    return dispatch({
      type: DeviceConstants.DEVICE_FETCH_DETAILS,
      payload: {
        promise: request.get(API_BASE_URL + `/${id}`, {
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

export function updateDevice(id, name, state) {
  return (dispatch, getState) => {
    const storeState = getState()
    const accessToken = storeState.auth.accessToken

    return dispatch({
      type: DeviceConstants.DEVICE_UPDATE,
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
