import Immutable from 'immutable'

const defaultState = new Immutable.List()

export default function devices(state = defaultState, action) {

  switch(action.type) {
    case 'FETCH_ALL_DEVICE':
      return Immutable.fromJS(action.payload.data)
    case 'CREATE_DEVICE':
      return state.concat(action.text)
    case 'EDIT_DEVICE':
      return state.set(action.id, action.text)
    case 'DELETE_DEVICE':
      return state.delete(action.id)
    default:
      return state
  }

}
