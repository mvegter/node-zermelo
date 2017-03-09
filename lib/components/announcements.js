'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getAnnouncements = function(bool, callback) {
  if(!this.token) {
    return;
  }

  var data = {
    'current' : bool,
    'user': '~me',
    'access_token': this.token
  };

  this._apiGet('announcements', data, function(err, res) {
    if(err) {
      callback(new Error(err));
    }
    
    if(!err && res) {
      callback(null, res);
    }
  });
};
