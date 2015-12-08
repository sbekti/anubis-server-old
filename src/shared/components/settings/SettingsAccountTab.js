import React from 'react'
import { connect } from 'react-redux'

import * as UserActions from '../../actions/UserActions'
import SettingsAccountForm from './SettingsAccountForm'

function mapStateToProps(state) {
  return { user: state.user }
}

class SettingsAccountTab extends React.Component {

  constructor(props) {
    super(props)
  }

  _handleSubmit = (name, email, password) => {
    console.log(this.props.user)
    const id = this.props.user.details.id

    this.props.dispatch(UserActions.updateUser(id, name, email, password))
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <p className='lead'>Account</p>
        <SettingsAccountForm
          placeholderName={user.details.name}
          placeholderEmail={user.details.email}
          onSubmit={this._handleSubmit}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(SettingsAccountTab)
