'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getAnnouncements = function(bool, callback) {
  var current = (bool).toLowerCase();

  if( (bool !== 'false' && bool !== false) && (bool !== 'true' && bool !== true) ) {
    return callback(new Error('Invalid Bool Parameter Bool (use: true / false)'));
  }

  var sendData = {
    'current' : bool,
    'user'    : '~me',
    'access_token': this.token
  };

  this._apiGet('announcements', sendData, function(err, res) {
    if(err) {
      return callback(err);
    }

    return callback(null, res);
  });
};