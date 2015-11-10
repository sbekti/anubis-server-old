import fetch from 'isomorphic-fetch'

// export function fetchDevices(text) {
//   return {
//     type: 'FETCH_DEVICES',
//     promise: request.get(API_URL)
//   }
// }

export function createDevice(text) {
  return {
    type: 'CREATE_DEVICE',
    text
  }
}

export function editDevice(id, text) {
  return {
    type: 'EDIT_DEVICE',
    id,
    text
  }
}

export function deleteDevice(id) {
  return {
    type: 'DELETE_DEVICE',
    id
  }
}
