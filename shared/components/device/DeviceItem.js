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
    const currentVal = this.props.text

    let text = window.prompt('', currentVal)

    this.props.onEdit(id, text)
  }

  render() {
    return (
      <div>
        {this.props.text}
        <button onClick={this._handleEdit}>Edit</button>
        <button onClick={this._handleDelete}>X</button>
      </div>
    )
  }

}

export default DeviceItem
