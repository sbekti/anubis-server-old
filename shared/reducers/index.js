import { combineReducers } from 'redux'
import devices from './DeviceReducer'

const rootReducer = combineReducers({
  devices
})

export default rootReducer
