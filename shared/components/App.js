import React from 'react';
import { Link } from 'react-router'

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  onMenuIconButtonTouchTap() {
    this.refs.navMenu.toggle();
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/login'>Login (lazy loaded)</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;
