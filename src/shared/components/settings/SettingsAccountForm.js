import React from 'react'
import classNames from 'classnames'
import validator from 'validator'

class SettingsAccountForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nameError: false,
      emailError: false
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault()

    const accountNameInput = this.refs['account-name-input']
    const accountEmailInput = this.refs['account-email-input']
    const accountPasswordInput = this.refs['account-password-input']
    const name = accountNameInput.value
    const email = accountEmailInput.value
    const password = accountPasswordInput.value

    let error = false

    if (name.length == 0) {
      error = true
      this.setState({ nameError: true })
    } else {
      this.setState({ nameError: false })
    }

    if ((email.length == 0) || (!validator.isEmail(email))) {
      error = true
      this.setState({ emailError: true })
    } else {
      this.setState({ emailError: false })
    }

    if (!error) {
      this.props.onSubmit(name, email, password)
    }
  }

  render() {
    const nameFormGroupClass = classNames({
      'form-group': true,
      'has-error': this.state.nameError
    })

    const emailFormGroupClass = classNames({
      'form-group': true,
      'has-error': this.state.emailError
    })

    const { isReadOnly } = this.props

    return (
      <form onSubmit={this._handleSubmit}>
        <div className={nameFormGroupClass}>
          <label htmlFor='account-name-input' className='control-label'>Name</label>
          <input type='text' className='form-control' readOnly={isReadOnly} id='account-name-input' ref='account-name-input' placeholder='Name' defaultValue={this.props.placeholderName} />
        </div>
        <div className={emailFormGroupClass}>
          <label htmlFor='account-email-input' className='control-label'>Email</label>
          <input type='email' className='form-control' readOnly={isReadOnly} id='account-email-input' ref='account-email-input' placeholder='Email' defaultValue={this.props.placeholderEmail} />
        </div>
        <div className='form-group'>
          <label htmlFor='account-password-input' className='control-label'>New Password</label>
          <input type='password' className='form-control' readOnly={isReadOnly} id='account-password-input' ref='account-password-input' placeholder='New Password' />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-default' readOnly={isReadOnly}>Save</button>
        </div>
      </form>
    )
  }
}

export default SettingsAccountForm
