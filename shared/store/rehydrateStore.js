import Immutable from 'immutable'
import assign from 'object-assign'

Object.assign = Object.assign || assign;

export default function rehydrateStore(obj) {
  let objMut = Object.assign({}, obj)

  objMut.device = Object.assign({}, objMut.device, {
    list: Immutable.fromJS(objMut.device.list)
  })

  return objMut
}
