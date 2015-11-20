const defaultTypes = ['PENDING', 'FULFILLED', 'REJECTED']

function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function'
  }
}

export default function promiseMiddleware({ dispatch, getState }) {
  return (next) => {
    const recurse = (action) => {
      if (typeof action === 'function') {
        return action(recurse, getState)
      }

      if (!isPromise(action.payload)) {
        return next(action)
      }

      const { type, payload, meta } = action
      const { promise, data } = payload
      const [ PENDING, FULFILLED, REJECTED ] = defaultTypes

      /**
      * Dispatch the first async handler. This tells the
      * reducer that an async action has been dispatched.
      */
      next({
        type: `${type}_${PENDING}`,
        ...data && { payload: data },
        ...meta && { meta }
      })

      /**
       * Return either the fulfilled action object or the rejected
       * action object.
       */
      return promise.then(
        (resolved={}) => next({
          type: `${type}_${FULFILLED}`,
          ...resolved.meta || resolved.payload ? resolved : {
            ...resolved && { payload: resolved },
            ...meta && { meta }
          }
        }),
        error => next({
          type: `${type}_${REJECTED}`,
          payload: error,
          error: true,
          ...meta && { meta }
        })
      )
    }

    return recurse
  }
}
