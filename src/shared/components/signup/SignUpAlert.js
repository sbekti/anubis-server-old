import React from 'react'

class SignUpAlert extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { messages } = this.props

    return (
      <div>
        {
          messages.map((message, index) => {
            return (
              <div key={index} className='alert alert-danger' role='alert'>
                {message}
              </div>
            )
          })
        }
      </div>
    )
  }

}

export default SignUpAlert
