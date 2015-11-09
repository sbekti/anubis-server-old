import alt from '../alt';
import DeviceActions from '../actions/DeviceActions';

class DeviceStore {

  constructor() {
    var self = this;

    this.bindListeners({
      updateDevices: DeviceActions.UPDATE_DEVICES
    });

    this.on('init', function(){
      self.devices = [];
    });
  }

  updateDevices(devices){
    this.devices = devices;
  }

}

export default alt.createStore(DeviceStore, 'DeviceStore');
