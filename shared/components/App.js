import React from 'react';
import { Link, IndexLink } from 'react-router'
import DeviceActions from '../actions/DeviceActions';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  onDeviceLinkClick() {
    DeviceActions.loadAllDevices();
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><IndexLink to='/'>Home</IndexLink></li>
          <li><Link to='/devices' onClick={this.onDeviceLinkClick}>Devices</Link></li>
          <li><Link to='/auth/login'>Login (lazy loaded)</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;
