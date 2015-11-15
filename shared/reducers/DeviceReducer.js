import * as DeviceConstants from '../constants/DeviceConstants'

const defaultState = {
  isPrefetched: false,
  isFetching: false,
  data: []
}

export default function device(state = defaultState, action) {

  switch (action.type) {

    case DeviceConstants.DEVICE_FETCH_ALL_PENDING: {
      return Object.assign({}, state, {
        isFetching: true
      })
    }

    case DeviceConstants.DEVICE_FETCH_ALL_FULFILLED: {
      return Object.assign({}, state, {
        isPrefetched: true,
        isFetching: false,
        data: action.payload.data
      })
    }

    case DeviceConstants.DEVICE_FETCH_ALL_REJECTED: {
      return Object.assign({}, state, {
        isFetching: false
      })
    }

    case DeviceConstants.DEVICE_CREATE_PENDING: {
      return state
    }

    case DeviceConstants.DEVICE_CREATE_FULFILLED: {
      return Object.assign({}, state, {
        data: [...state.data, action.payload.data]
      })
    }

    case DeviceConstants.DEVICE_CREATE_REJECTED: {
      return state
    }

    case DeviceConstants.DEVICE_EDIT_PENDING: {
      return state
    }

    case DeviceConstants.DEVICE_EDIT_FULFILLED: {
      return Object.assign({}, state, {
        data: state.data.map(device =>
          device.id === action.meta.id ? Object.assign({}, device, {
            name: action.meta.name,
            state: action.meta.state
          }) : device
        )
      })
    }

    case DeviceConstants.DEVICE_EDIT_REJECTED: {
      return state
    }

    case DeviceConstants.DEVICE_DELETE_PENDING: {
      return state
    }

    case DeviceConstants.DEVICE_DELETE_FULFILLED: {
      return Object.assign({}, state, {
        data: state.data.filter(device => device.id !== action.meta.id)
      })
    }

    case DeviceConstants.DEVICE_DELETE_REJECTED: {
      return state
    }

    default: {
      return state
    }

  }

}
