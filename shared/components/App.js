import React from 'react'
import NavBar from './common/NavBar'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
