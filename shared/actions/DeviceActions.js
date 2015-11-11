import fetch from 'axios'

export function fetchAllDevices(url) {
  console.log('url: ', url)

  return {
    type: 'FETCH_ALL_DEVICE',
    payload: fetch(url)
  }
}

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
