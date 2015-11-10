import React from 'react'

class DeviceItem extends React.Component {

  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleDelete() {
    const id = this.props.id
    this.props.onDelete(id)
  }

  handleEdit() {
    const id = this.props.id
    const currentVal = this.props.text

    let text = window.prompt('', currentVal)

    this.props.onEdit(id, text)
  }

  render() {
    return (
      <div>
        {this.props.text}
        <button onClick={this.handleEdit}>Edit</button>
        <button onClick={this.handleDelete}>X</button>
      </div>
    )
  }

}

export default DeviceItem
