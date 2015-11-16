import { combineReducers } from 'redux'
import auth from './AuthReducer'
import device from './DeviceReducer'

const rootReducer = combineReducers({
  auth,
  device
})

export default rootReducer
