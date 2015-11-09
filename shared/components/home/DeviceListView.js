import React from 'react';
import DeviceStore from '../../stores/DeviceStore';
import DeviceItem from './DeviceItem';

class DeviceListView extends React.Component {

  constructor(props) {
    super(props);
    this.state = DeviceStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    DeviceStore.listen(this.onChange);
  }

  componentWillUnmount() {
    DeviceStore.unlisten(this.onChange);
  }

  onChange(state) {
    console.log('Flux store changed');
    this.setState(state);
  }

  render() {
    let devices = this.state.devices.map(function(device) {
      return (
        <DeviceItem key={device.id} device={device} />
      );
    });

    return (
      <div>
        {devices}
      </div>
    );
  }
}

export default DeviceListView;
