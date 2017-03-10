'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getAnnouncements = function(bool, callback) {
  if(!this.token) {
    return callback(new Error('Missing token!'), null);
  }
  else if(!bool) {
    return callback(new Error('Missing Bool Current!'), null);
  }

  const sendData = {
    'current' : bool,
    'user'    : '~me',
    'access_token': this.token
  };

  this._apiGet('announcements', sendData, function(err, res) {
    if(err) {
      callback(new Error(err), null);
    }
    else if(!err && res) {
      callback(null, res);
    }
    else {
      callback(new Error('Unknown Error Occured!'), null);
    }
  });
};
