import React from 'react'
import { connect } from 'react-redux'

import * as AuthActions from '../../actions/AuthActions'
import * as UserActions from '../../actions/UserActions'

function mapStateToProps(state) {
  return { auth: state.auth }
}

class SignOutPage extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(AuthActions.signOut())
    this.props.dispatch(UserActions.clearUser())

    this.props.history.replaceState(null, '/')
  }

  render() {
    const { auth, dispatch } = this.props

    return (
      <div>Signing out...</div>
    )
  }
}

export default connect(mapStateToProps)(SignOutPage)
