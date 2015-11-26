import React from 'react'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return { user: state.user }
}

class HomePage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { user } = this.props
    const userName = typeof(user.details.name) !== 'undefined' ?
      user.details.name : 'visitor'

    return (
      <h1>Hello, {userName}!</h1>
    )
  }
}

export default connect(mapStateToProps)(HomePage)
