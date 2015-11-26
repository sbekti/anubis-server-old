import React from 'react'
import classNames from 'classnames'
import validator from 'validator'

class SignUpForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      nameError: false,
      emailError: false,
      passwordError: false
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault()

    const signUpNameInput = this.refs['signup-name-input']
    const signUpEmailInput = this.refs['signup-email-input']
    const signUpPasswordInput = this.refs['signup-password-input']
    const name = signUpNameInput.value
    const email = signUpEmailInput.value
    const password = signUpPasswordInput.value

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

    if (password.length == 0) {
      error = true
      this.setState({ passwordError: true })
    } else {
      this.setState({ passwordError: false })
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

    const passwordFormGroupClass = classNames({
      'form-group': true,
      'has-error': this.state.passwordError
    })

    const { isReadOnly } = this.props

    return (
      <form onSubmit={this._handleSubmit}>
        <div className={nameFormGroupClass}>
          <label htmlFor='signup-name-input' className='control-label'>Name</label>
          <input type='text' className='form-control' readOnly={isReadOnly} id='signup-name-input' ref='signup-name-input' placeholder='Email' />
        </div>
        <div className={emailFormGroupClass}>
          <label htmlFor='signup-email-input' className='control-label'>Email</label>
          <input type='email' className='form-control' readOnly={isReadOnly} id='signup-email-input' ref='signup-email-input' placeholder='Email' />
        </div>
        <div className={passwordFormGroupClass}>
          <label htmlFor='signup-password-input' className='control-label'>Password</label>
          <input type='password' className='form-control' readOnly={isReadOnly} id='signup-password-input' ref='signup-password-input' placeholder='Password' />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-default' readOnly={isReadOnly}>Sign Up</button>
        </div>
      </form>
    )
  }
}

export default SignUpForm
