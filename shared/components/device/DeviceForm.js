import React from 'react'
import classNames from 'classnames'

class DeviceForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      error: false
    }
  }

  _handleSubmit = (e) => {
    e.preventDefault()

    const deviceNameInput = this.refs['device-name-input']
    const deviceName = deviceNameInput.value

    if (deviceName.length == 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })
      this.props.onSubmit(deviceName, 1)
      deviceNameInput.value = ''
    }
  }

  render() {
    const formGroupClass = classNames({
      'form-group': true,
      'has-error': this.state.error
    })

    const submitButtonClass = classNames({
      'btn': true,
      'btn-default': !this.state.error,
      'btn-danger': this.state.error
    })

    const { isDisabled } = this.props

    return (
      <form onSubmit={this._handleSubmit}>
        <div className={formGroupClass}>
          <div className='input-group'>
            <input type='text' className='form-control' disabled={isDisabled} id='device-name-input' ref='device-name-input' placeholder='Add a new device...' />
            <span className='input-group-btn'>
              <button type='submit' className={submitButtonClass} disabled={isDisabled}>Add</button>
            </span>
          </div>
        </div>
      </form>
    )
  }
}

export default DeviceForm
