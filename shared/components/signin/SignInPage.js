import React from 'react'
import SignInForm from './SignInForm'
import SignInAlert from './SignInAlert'

import { connect } from 'react-redux'
import * as AuthActions from '../../actions/AuthActions'

function mapStateToProps(state) {
  return { auth: state.auth }
}

class SignInPage extends React.Component {

  constructor(props) {
    super(props)

    let redirectTo = '/'
    const query = this.props.location.query

    if ((query) && (query.hasOwnProperty('next'))) {
      redirectTo = query.next
    }

    this.state = {
      redirectTo: redirectTo
    }
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.pushState(null, this.state.redirectTo)
    }
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.auth.isAuthenticated) &&
        (!this.props.auth.isAuthenticated)) {
      this.props.history.pushState(null, this.state.redirectTo)
    }
  }

  _handleSubmit = (email, password) => {
    this.props.dispatch(AuthActions.signIn(email, password))
  }

  render() {
    const { auth, dispatch } = this.props
    const signInAlert = auth.isError ? <SignInAlert /> : null

    return (
      <div>
        {signInAlert}
        <SignInForm
          onSubmit={this._handleSubmit}
          isReadOnly={auth.isRequesting}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(SignInPage)
