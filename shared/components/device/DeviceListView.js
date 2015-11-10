import React from 'react'
import DeviceItem from './DeviceItem'

class DeviceListView extends React.Component {

  constructor(props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleEdit(id, text) {
    this.props.onEdit(id, text)
  }

  handleDelete(id) {
    this.props.onDelete(id)
  }

  render() {
    return (
      <div>
        {
          this.props.devices.map(function(device, index) {
            return (
              <DeviceItem
                key={index}
                id={index}
                text={device}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
              />
            )
          }.bind(this))
        }
      </div>
    )
  }
}

export default DeviceListView
