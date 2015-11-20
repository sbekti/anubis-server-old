import React from 'react'
import DeviceListView from './DeviceListView'
import DeviceForm from './DeviceForm'
import DeviceLoadingIndicator from './DeviceLoadingIndicator'

import { connect } from 'react-redux'
import * as DeviceActions from '../../actions/DeviceActions'

function mapStateToProps(state) {
  return {
    device: state.device
  }
}

class DevicePage extends React.Component {

  static fetchInitialData = () => {
    return [
      DeviceActions.fetchAllDevices()
    ]
  }

  constructor(props) {
    console.log('DevicePage constructor')
    super(props)
  }

  componentWillMount() {
    console.log('DevicePage componentWillMount')
  }

  componentDidMount() {
    console.log('DevicePage componentDidMount')
    this.props.dispatch(DeviceActions.fetchAllDevicesIfNeeded())
  }

  _handleEdit = (id, name, state) => {
    console.log(this)
    this.props.dispatch(DeviceActions.editDevice(id, name, state))
  }

  _handleDelete = (id) => {
    this.props.dispatch(DeviceActions.deleteDevice(id))
  }

  _handleSubmit = (name, state) => {
    this.props.dispatch(DeviceActions.createDevice(name, state))
  }

  render() {
    console.log('DevicePage render')

    const { device, dispatch } = this.props

    if (device.isFetching) {
      return (
        <DeviceLoadingIndicator />
      )
    }

    return (
      <div>
        <DeviceListView
          data={device.data}
          onEdit={this._handleEdit}
          onDelete={this._handleDelete}
        />
        <DeviceForm
          onSubmit={this._handleSubmit}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevicePage)
