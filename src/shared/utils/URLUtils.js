import serverConfig from '../../server/config/server'

export function isBrowser() {
  return typeof window !== 'undefined'
}

export function isNode() {
  return typeof window === 'undefined' && typeof process !== 'undefined'
}

export function isWebWorker() {
  return typeof self !== 'undefined' && typeof postMessage === 'function'
}

export function normalizeURL(url) {
  if (isNode()) {
    return `http://127.0.0.1:${serverConfig.SERVER_PORT}${url}`
  } else {
    return url
  }
}
