export function prefetchComponentData(dispatch, components, params) {
  let actions = []

  for (const prop in components) {
    if (components.hasOwnProperty(prop)) {
      const component = components[prop]
      const fetchInitialData = component.fetchInitialData

      if (fetchInitialData) {
        fetchInitialData().map(action => actions.push(action))
      }
    }
  }

  console.log('actions: ', actions)

  const promises = actions.map(action => dispatch(action))

  return Promise.all(promises);
}
