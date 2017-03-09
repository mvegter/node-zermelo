'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getSchedule = function(offset, callback) {
  if(!this.token) {
    return;
  }
  var self = this;

  var data = {
    "start" : '1488668400',
    "end"   : '1489359540',
    "user"  : "~me",
    "access_token": this.token,   
  };

  this._apiGet('appointments', data, function(err, res) {
    if(err) {
      return callback(err, null);
    }
    return callback(null, res);
  });
};