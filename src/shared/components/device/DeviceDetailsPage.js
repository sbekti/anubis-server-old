import React from 'react'
import { connect } from 'react-redux'

import * as DeviceActions from '../../actions/DeviceActions'
import DeviceItem from './DeviceItem'

function mapStateToProps(state) {
  return { details: state.device.details }
}

class DeviceDetailsPage extends React.Component {

  static fetchInitialData = (locals) => {
    return [
      DeviceActions.fetchDeviceDetails(locals.params.id)
    ]
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(DeviceActions.fetchDeviceDetailsIfNeeded(this.props.routeParams.id))
  }

  _handleUpdate = (id, name, state) => {
    this.props.dispatch(DeviceActions.updateDevice(id, name, state))
  }

  _handleDelete = (id) => {
    this.props.dispatch(DeviceActions.deleteDevice(id))
  }

  render() {
    const { details } = this.props

    return (
      <DeviceItem
        id={details.id}
        name={details.name}
        state={details.state}
        onUpdate={this._handleUpdate}
        onDelete={this._handleDelete}
      />
    )
  }
}

export default connect(mapStateToProps)(DeviceDetailsPage)
