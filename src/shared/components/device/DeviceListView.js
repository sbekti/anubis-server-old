import React from 'react'
import DeviceItem from './DeviceItem'

class DeviceListView extends React.Component {

  constructor(props) {
    super(props)
  }

  _handleUpdate = (id, name, state) => {
    this.props.onUpdate(id, name, state)
  }

  _handleDelete = (id) => {
    this.props.onDelete(id)
  }

  render() {
    const { data } = this.props

    return (
      <div>
        {
          data.map(device => {
            return (
              <DeviceItem
                key={device.id}
                id={device.id}
                name={device.name}
                state={device.state}
                onUpdate={this._handleUpdate}
                onDelete={this._handleDelete}
              />
            )
          })
        }
      </div>
    )
  }
}

export default DeviceListView
