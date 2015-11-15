import request from 'axios'
import * as DeviceConstants from '../constants/DeviceConstants'

const API_BASE_URL = 'http://localhost:3000/api/v1/devices'

function shouldFetchAllDevices(state) {
  if (state.device.isPrefetched) {
    return false
  }

  if (state.device.isFetching) {
    return false
  }

  return true
}

export function fetchAllDevicesIfNeeded() {
  return (dispatch, getState) => {
    const state = getState()

    if (!shouldFetchAllDevices(state)) {
      console.log('Data is already prefetched. Skipping loading data.')
      return
    }

    dispatch(fetchAllDevices())
  }
}

export function fetchAllDevices() {
  return {
    type: DeviceConstants.DEVICE_FETCH_ALL,
    payload: {
      promise: request.get(API_BASE_URL)
    }
  }
}

export function createDevice(name, state) {
  return {
    type: DeviceConstants.DEVICE_CREATE,
    payload: {
      promise: request.post(API_BASE_URL, {
        name: name,
        state: state
      })
    },
    name,
    state
  }
}

export function editDevice(id, name, state) {
  return {
    type: DeviceConstants.DEVICE_EDIT,
    payload: {
      promise: request.put(API_BASE_URL + `/${id}`, {
        name: name,
        state: state
      })
    },
    meta: {
      id,
      name,
      state
    }
  }
}

export function deleteDevice(id) {
  return {
    type: DeviceConstants.DEVICE_DELETE,
    payload: {
      promise: request.delete(API_BASE_URL + `/${id}`)
    },
    meta: {
      id
    }
  }
}
