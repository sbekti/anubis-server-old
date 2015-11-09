import alt from '../alt';
import request from 'superagent';

class DeviceActions {

  loadAllDevices(callback) {
    var self = this;

    request.get('http://localhost:3000/posts.json', (err, res) => {
      if (err) throw err;

      self.actions.updateDevices(JSON.parse(res.text));

      if (callback){
        callback();
      }
    });
  }

  updateDevices(devices) {
    this.dispatch(devices);
  }

}

export default alt.createActions(DeviceActions);
