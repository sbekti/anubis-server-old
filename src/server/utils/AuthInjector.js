import jwt from 'jsonwebtoken'
import { createStore } from 'redux'

import config from '../config/auth'
import rootReducer from '../../shared/reducers'
import * as AuthActions from '../../shared/actions/AuthActions'
import * as UserActions from '../../shared/actions/UserActions'

export function injectAccessToken(dispatch, cookies) {

  // Return a promise to make sure that all actions finished before rendering
  return new Promise((resolve, reject) => {

    // Get the access token from the cookie
    const accessToken = cookies.access_token

    if (typeof(accessToken) !== 'undefined') {
      try {
        // Try to decode the token
        const decodedToken = jwt.verify(accessToken, config.JWT_SECRET_KEY)

        // Access token verified, inject the token into store
        dispatch(AuthActions.injectAccessToken(accessToken, decodedToken))

        // This array will store all promises from actions for global prefetching
        let promises = []

        // Fetch current user details
        promises.push(dispatch(UserActions.fetchUserDetails(decodedToken.id)))

        // Wait for all promises to resolve, then proceed to render
        Promise.all(promises).then(resolve)
      } catch (err) {
        // Access token expired or invalid, skip token injection
        console.log('Invalid token.')
        resolve()
      }
    } else {
      // No cookie, skip token injection
      resolve()
    }

  })

}
