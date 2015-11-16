import React from 'react'

class SignInAlert extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='alert alert-danger' role='alert'>
        Invalid email or password.
      </div>
    )
  }

}

export default SignInAlert
