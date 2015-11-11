export function fetchComponentData(dispatch, components, params) {
  let actionPromises = []

  for (const prop in components) {
    if (components.hasOwnProperty(prop)) {
      const component = components[prop]
      const fetchInitialData = component.fetchInitialData

      if (fetchInitialData) {
        fetchInitialData().map(actionPromise => actionPromises.push(actionPromise))
      }
    }
  }

  console.log('actionPromises: ', actionPromises)

  const fetchPromises = actionPromises.map(actionPromise => dispatch(actionPromise))

  return Promise.all(fetchPromises);
}
