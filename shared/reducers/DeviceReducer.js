import Immutable from 'immutable'

import {
  DEVICE_FETCH_ALL_PENDING,
  DEVICE_FETCH_ALL_FULFILLED,
  DEVICE_FETCH_ALL_REJECTED,
  DEVICE_CREATE,
  DEVICE_EDIT,
  DEVICE_DELETE
} from '../actions/DeviceActions'

const defaultState = {
  isPrefetched: false,
  isFetching: false,
  list: new Immutable.List()
}

export default function device(state = defaultState, action) {

  switch(action.type) {
    case DEVICE_FETCH_ALL_PENDING:
      return Object.assign({}, state, {
        isFetching: true
      })
    case DEVICE_FETCH_ALL_FULFILLED:
      return Object.assign({}, state, {
        isPrefetched: true,
        isFetching: false,
        list: Immutable.fromJS(action.payload.data)
      })
    case DEVICE_FETCH_ALL_REJECTED:
      return Object.assign({}, state, {
        isFetching: false
      })
    case DEVICE_CREATE:
      return Object.assign({}, state, {
        list: state.list.concat(action.text)
      })
    case DEVICE_EDIT:
      return Object.assign({}, state, {
        list: state.list.set(action.id, action.text)
      })
    case DEVICE_DELETE:
      return Object.assign({}, state, {
        list: state.list.delete(action.id)
      })
    default:
      return state
  }

}
