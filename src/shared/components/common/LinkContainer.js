import React from 'react'
import { Link, History, PropTypes } from 'react-router'

class LinkContainer extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const isActive = this.context.history.isActive(this.props.to, this.props.query)
    const className = isActive ? 'active' : ''
    return <li className={className}><Link {...this.props}/></li>
  }

}

LinkContainer.contextTypes = { history: PropTypes.history }

export default LinkContainer
