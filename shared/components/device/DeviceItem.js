import React from 'react'

class DeviceItem extends React.Component {

  constructor(props) {
    super(props)
  }

  _handleDelete = () => {
    const id = this.props.id
    this.props.onDelete(id)
  }

  _handleEdit = () => {
    const id = this.props.id
    const currentName = this.props.name
    const currentState = this.props.state

    const name = window.prompt('', currentName)
    const state = parseInt(window.prompt('', currentState))

    this.props.onEdit(id, name, state)
  }

  render() {
    return (
      <div>
        <span>{this.props.name}</span>
        <span>{this.props.state}</span>
        <button onClick={this._handleEdit}>Edit</button>
        <button onClick={this._handleDelete}>X</button>
      </div>
    )
  }

}

export default DeviceItem
