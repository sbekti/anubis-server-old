import React from 'react'

class DeviceForm extends React.Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    let node = this.refs['device-input']
    this.props.onSubmit(node.value)
    node.value = ''
  }

  render() {
    return (
      <div>
        <input type='text' placeholder='Type device' ref='device-input' />
        <input type='submit' value='OK!' onClick={this.handleSubmit} />
      </div>
    )
  }
}

export default DeviceForm
