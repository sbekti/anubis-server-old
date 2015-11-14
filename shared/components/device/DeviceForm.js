import React from 'react'

class DeviceForm extends React.Component {

  constructor(props) {
    super(props)
  }

  _handleSubmit = () => {
    let node = this.refs['device-input']
    this.props.onSubmit(node.value)
    node.value = ''
  }

  render() {
    return (
      <div>
        <input type='text' placeholder='Type device' ref='device-input' />
        <input type='submit' value='OK!' onClick={this._handleSubmit} />
      </div>
    )
  }
}

export default DeviceForm
