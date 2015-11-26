import React from 'react'
import { connect } from 'react-redux'

import * as AuthActions from '../../actions/AuthActions'
import SignUpForm from './SignUpForm'
import SignUpAlert from './SignUpAlert'

function mapStateToProps(state) {
  return { auth: state.auth }
}

class SignUpPage extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const { auth, dispatch, history } = this.props

    if ((nextProps.auth.hasSignUpCompleted) && (!auth.hasSignUpCompleted)) {
      history.replaceState(null, '/auth/signin')
      dispatch(AuthActions.resetSignUpCompletedFlag())
    }
  }

  _handleSubmit = (name, email, password) => {
    this.props.dispatch(AuthActions.signUp(name, email, password))
  }

  render() {
    const { auth, dispatch } = this.props
    const signUpAlert = auth.signUpErrors.length > 0 ?
      <SignUpAlert messages={auth.signUpErrors} /> : null

    return (
      <div>
        {signUpAlert}
        <SignUpForm
          onSubmit={this._handleSubmit}
          isReadOnly={auth.isSignUpRequesting}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(SignUpPage)
