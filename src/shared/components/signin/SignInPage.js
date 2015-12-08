import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

import * as AuthActions from '../../actions/AuthActions'
import * as UserActions from '../../actions/UserActions'
import SignInForm from './SignInForm'
import SignInAlert from './SignInAlert'

function mapStateToProps(state) {
  return { auth: state.auth }
}

class SignInPage extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const { auth, dispatch, history, location } = this.props

    if ((nextProps.auth.hasSignInCompleted) && (!auth.hasSignInCompleted)) {
      if (location.state && location.state.nextPathname) {
        history.replaceState(null, location.state.nextPathname)
      } else {
        history.replaceState(null, '/')
      }

      dispatch(UserActions.fetchUser(nextProps.auth.userId))
      dispatch(AuthActions.resetSignInCompletedFlag())
    }
  }

  _handleSubmit = (email, password) => {
    this.props.dispatch(AuthActions.signIn(email, password))
  }

  render() {
    const { auth, dispatch } = this.props
    const signInAlert = auth.signInErrors.length > 0 ?
      <SignInAlert messages={auth.signInErrors} /> : null

    return (
      <div>
        {signInAlert}
        <SignInForm
          onSubmit={this._handleSubmit}
          isReadOnly={auth.isSignInRequesting}
        />
        <Link to='/auth/signup'>Sign Up</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps)(SignInPage)
