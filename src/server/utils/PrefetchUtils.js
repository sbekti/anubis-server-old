export function prefetchComponentData(components, locals) {
  let actions = []

  for (const prop in components) {
    if (components.hasOwnProperty(prop)) {
      const component = components[prop]
      const fetchInitialData = component.fetchInitialData

      if (fetchInitialData) {
        fetchInitialData(locals).map(action => actions.push(action))
      }
    }
  }

  const promises = actions.map(action => locals.dispatch(action))

  return Promise.all(promises)
}
