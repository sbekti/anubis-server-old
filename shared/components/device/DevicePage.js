import React from 'react'
import DeviceListView from './DeviceListView'
import DeviceForm from './DeviceForm'
import DeviceLoadingIndicator from './DeviceLoadingIndicator'

import { connect } from 'react-redux'
import * as DeviceActions from '../../actions/DeviceActions'

const API_URL = 'http://localhost:3000/api/v1'

function mapStateToProps(state) {
  return { device: state.device }
}

class DevicePage extends React.Component {

  static fetchInitialData = () => {
    let actions = []

    actions.push(DeviceActions.fetchAllDevices(API_URL))

    return actions
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(DeviceActions.fetchAllDevicesIfNeeded(API_URL))
  }

  _handleEdit = (id, text) => {
    this.props.dispatch(DeviceActions.editDevice(id, text))
  }

  _handleDelete = (id) => {
    this.props.dispatch(DeviceActions.deleteDevice(id))
  }

  _handleSubmit = (text) => {
    this.props.dispatch(DeviceActions.createDevice(text))
  }

  render() {
    const { device, dispatch } = this.props

    if (device.isFetching) {
      return (
        <DeviceLoadingIndicator />
      )
    }

    return (
      <div id='device-list'>
        <DeviceListView
          devices={device.list}
          onEdit={this._handleEdit}
          onDelete={this._handleDelete}
        />
        <DeviceForm onSubmit={this._handleSubmit} />
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevicePage)
