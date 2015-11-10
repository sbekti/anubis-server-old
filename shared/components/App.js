import React from 'react';
import { Link, IndexLink } from 'react-router'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><IndexLink to='/'>Home</IndexLink></li>
          <li><Link to='/devices'>Devices</Link></li>
          <li><Link to='/auth/login'>Login</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App
