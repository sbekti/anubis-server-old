import React from 'react'
import { Link } from 'react-router'

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
    const currentName = this.props.name
    const currentState = this.props.state

    const name = window.prompt('', currentName)
    const state = parseInt(window.prompt('', currentState))

    this.props.onEdit(id, name, state)
  }

  render() {
    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <h3 className='panel-title'>
            <Link to={'/devices/' + this.props.id}>{this.props.name}</Link>
          </h3>
        </div>
        <div className='panel-body'>
          <p>State: {this.props.state}</p>
          <button className='btn btn-default' onClick={this._handleEdit}>Edit</button>
          &nbsp;
          <button className='btn btn-danger' onClick={this._handleDelete}>Delete</button>
        </div>
      </div>
    )
  }

}

export default DeviceItem
