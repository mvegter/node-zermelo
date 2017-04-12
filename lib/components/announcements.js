'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getAnnouncements = function (bool, callback) {
  var current = (bool).toLowerCase();

  if ((bool !== 'false' && bool !== false) && (bool !== 'true' && bool !== true)) {
    return callback('Invalid Bool Parameter Bool (use: true / false)');
  }

  var sendData = {
    'current': bool,
    'user': '~me',
    'access_token': this._token
  };

  this.Get('announcements', sendData, function (err, res) {
    if (err) {
      return callback(err);
    }

    return callback(null, res);
  });
};
