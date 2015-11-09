import React from 'react';
import DeviceListView from './DeviceListView';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  static onEnter(nextState, transition, callback) {
    setTimeout(callback, 1);
  }

  render() {
    return (
      <DeviceListView />
    );
  }
}

export default HomePage;
