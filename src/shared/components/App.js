import React from 'react'
import { connect } from 'react-redux'

import NavBar from './common/NavBar'

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  }
}

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { auth, user } = this.props

    return (
      <div>
        <NavBar auth={auth} user={user} />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
