import { combineReducers } from 'redux'
import auth from './AuthReducer'
import user from './UserReducer'
import device from './DeviceReducer'

const rootReducer = combineReducers({
  auth,
  user,
  device
})

export default rootReducer
