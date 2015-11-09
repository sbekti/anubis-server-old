import React from 'react';

class DeviceItem extends React.Component {

  render() {
    return (
      <a href='#'>
        <div>{this.props.device.title}</div>
        <div><span>{this.props.device.author.name}</span></div>
      </a>
    );
  }

}

export default DeviceItem;
