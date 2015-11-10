import React from 'react'
import DeviceListView from './DeviceListView'
import DeviceForm from './DeviceForm'

import { bindActionCreators } from 'redux';
import * as DeviceActions from '../../actions/DeviceActions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return { devices: state.devices }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DeviceActions, dispatch)
}

class DevicePage extends React.Component {

  constructor(props) {
    super(props)

    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEdit(id, text) {
    this.props.editDevice(id, text)
  }

  handleDelete(id) {
    this.props.deleteDevice(id)
  }

  handleSubmit(text) {
    this.props.createDevice(text)
  }

  render() {
    const { devices, dispatch } = this.props;

    return (
      <div id='device-list'>
        <DeviceListView
          devices={devices}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
        <DeviceForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicePage)
