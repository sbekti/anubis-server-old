import React from 'react'
import DeviceItem from './DeviceItem'

class DeviceListView extends React.Component {

  constructor(props) {
    super(props)
  }

  _handleEdit = (id, text) => {
    this.props.onEdit(id, text)
  }

  _handleDelete = (id) => {
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
                onEdit={this._handleEdit}
                onDelete={this._handleDelete}
              />
            )
          }.bind(this))
        }
      </div>
    )
  }
}

export default DeviceListView
