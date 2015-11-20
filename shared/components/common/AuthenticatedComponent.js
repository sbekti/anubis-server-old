import React from 'react'
import { connect } from 'react-redux'

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    constructor(props) {
      super(props)
    }

    componentWillMount() {
      this._checkAuth()
    }

    componentWillReceiveProps(nextProps) {
      this._checkAuth()
    }

    _checkAuth() {
      console.log('Checking auth...')
      if (!this.props.isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname
        console.log(this)
        this.props.history.pushState(null, `/auth/signin?next=${redirectAfterLogin}`)
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated ? <Component {...this.props} /> : null}
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    accessToken: state.auth.accessToken,
    isAuthenticated: state.auth.isAuthenticated
  })

  if (Component.hasOwnProperty('fetchInitialData')) {
    AuthenticatedComponent.fetchInitialData = Component.fetchInitialData
  }

  return connect(mapStateToProps)(AuthenticatedComponent)

}
