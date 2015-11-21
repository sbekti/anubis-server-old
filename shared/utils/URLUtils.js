import serverConfig from '../../server/config/server'

function isNode() {
  return Object.prototype.toString.call(global.process) === '[object process]'
}

export function normalizeURL(url) {
  if (!isNode) {
    return url
  } else {
    const newURL = `http://127.0.0.1:${serverConfig.SERVER_PORT}${url}`
    return newURL
  }
}
