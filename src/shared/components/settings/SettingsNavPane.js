import React from 'react'
import LinkContainer from '../common/LinkContainer'

class SettingsNavPane extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const style = {
      marginBottom: '1.5em'
    }

    return (
      <ul className='nav nav-pills nav-stacked' style={style}>
        <LinkContainer to='/settings/account'>Account</LinkContainer>
        <LinkContainer to='/settings/endpoints'>Endpoints</LinkContainer>
        <LinkContainer to='/settings/security'>Security</LinkContainer>
      </ul>
    )
  }
}

export default SettingsNavPane
