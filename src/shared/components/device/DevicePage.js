import React from 'react'
import { connect } from 'react-redux'

import * as DeviceActions from '../../actions/DeviceActions'
import DeviceListView from './DeviceListView'
import DeviceForm from './DeviceForm'
import DeviceLoadingIndicator from './DeviceLoadingIndicator'

function mapStateToProps(state) {
  return { device: state.device }
}

class DevicePage extends React.Component {

  static fetchInitialData = (locals) => {
    return [
      DeviceActions.fetchAllDevices()
    ]
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(DeviceActions.fetchAllDevicesIfNeeded())
  }

  _handleUpdate = (id, name, state) => {
    this.props.dispatch(DeviceActions.updateDevice(id, name, state))
  }

  _handleDelete = (id) => {
    this.props.dispatch(DeviceActions.deleteDevice(id))
  }

  _handleSubmit = (name, state) => {
    this.props.dispatch(DeviceActions.createDevice(name, state))
  }

  render() {
    const { device, dispatch } = this.props

    if (device.isFetching) {
      return (
        <DeviceLoadingIndicator />
      )
    }

    return (
      <div>
        <DeviceForm onSubmit={this._handleSubmit} />
        <DeviceListView
          data={device.data}
          onUpdate={this._handleUpdate}
          onDelete={this._handleDelete}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevicePage)
