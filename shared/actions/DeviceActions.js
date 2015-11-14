import fetch from 'axios'

export const DEVICE_FETCH_ALL = 'DEVICE_FETCH_ALL'
export const DEVICE_FETCH_ALL_PENDING = 'DEVICE_FETCH_ALL_PENDING'
export const DEVICE_FETCH_ALL_FULFILLED = 'DEVICE_FETCH_ALL_FULFILLED'
export const DEVICE_FETCH_ALL_REJECTED = 'DEVICE_FETCH_ALL_REJECTED'
export const DEVICE_CREATE = 'DEVICE_CREATE'
export const DEVICE_EDIT = 'DEVICE_EDIT'
export const DEVICE_DELETE = 'DEVICE_DELETE'

function shouldFetchAllDevices(state) {
  if (state.device.isPrefetched) {
    return false
  }

  if (state.device.isFetching) {
    return false
  }

  return true
}

export function fetchAllDevicesIfNeeded(url) {
  return (dispatch, getState) => {
    const state = getState()

    if (!shouldFetchAllDevices(state)) {
      console.log('Data is already prefetched. Skipping loading data.')
      return
    }

    dispatch(fetchAllDevices(url))
  }
}

export function fetchAllDevices(url) {
  return {
    type: DEVICE_FETCH_ALL,
    payload: {
      promise: fetch(url)
    }
  }
}

export function createDevice(text) {
  return {
    type: DEVICE_CREATE,
    text
  }
}

export function editDevice(id, text) {
  return {
    type: DEVICE_EDIT,
    id,
    text
  }
}

export function deleteDevice(id) {
  return {
    type: DEVICE_DELETE,
    id
  }
}
