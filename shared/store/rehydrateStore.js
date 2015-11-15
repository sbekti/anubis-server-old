import assign from 'object-assign'

Object.assign = Object.assign || assign

export default function rehydrateStore(obj) {
  return Object.assign({}, obj)
}
