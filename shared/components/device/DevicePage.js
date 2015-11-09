import React from 'react';
import DeviceListView from './DeviceListView';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DeviceListView />
    );
  }
}

export default HomePage;
