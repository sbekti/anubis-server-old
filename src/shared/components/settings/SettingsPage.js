import React from 'react'
import { connect } from 'react-redux'

import SettingsNavPane from './SettingsNavPane'

class SettingsPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='row'>
        <div className='col-md-3'>
          <p className='lead'>Settings</p>
          <SettingsNavPane />
        </div>
        <div className='col-md-9'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default SettingsPage
