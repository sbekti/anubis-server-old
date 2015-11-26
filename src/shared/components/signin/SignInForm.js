import React from 'react'
import classNames from 'classnames'
import validator from 'validator'

class SignInForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      emailError: false,
      passwordError: false
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault()

    const signInEmailInput = this.refs['signin-email-input']
    const signInPasswordInput = this.refs['signin-password-input']
    const email = signInEmailInput.value
    const password = signInPasswordInput.value

    let error = false

    if ((email.length == 0) || (!validator.isEmail(email))) {
      error = true
      this.setState({ emailError: true })
    } else {
      this.setState({ emailError: false })
    }

    if (password.length == 0) {
      error = true
      this.setState({ passwordError: true })
    } else {
      this.setState({ passwordError: false })
    }

    if (!error) {
      this.props.onSubmit(email, password)
    }
  }

  render() {
    const emailFormGroupClass = classNames({
      'form-group': true,
      'has-error': this.state.emailError
    })

    const passwordFormGroupClass = classNames({
      'form-group': true,
      'has-error': this.state.passwordError
    })

    const { isReadOnly } = this.props

    return (
      <form onSubmit={this._handleSubmit}>
        <div className={emailFormGroupClass}>
          <label htmlFor='signin-email-input' className='control-label'>Email</label>
          <input type='email' className='form-control' readOnly={isReadOnly} id='signin-email-input' ref='signin-email-input' placeholder='Email' />
        </div>
        <div className={passwordFormGroupClass}>
          <label htmlFor='signin-password-input' className='control-label'>Password</label>
          <input type='password' className='form-control' readOnly={isReadOnly} id='signin-password-input' ref='signin-password-input' placeholder='Password' />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-default' readOnly={isReadOnly}>Sign in</button>
        </div>
      </form>
    )
  }
}

export default SignInForm
