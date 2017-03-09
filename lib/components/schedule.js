'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getSchedule = function(unixStart, unixEnd, callback) {
  if(!this.token) {
    return;
  }
  var start = Math.round(parseInt(unixStart));
  var end   = Math.round(parseInt(unixEnd));

  var data = {
    "start" : start,
    "end"   : end,
    "user"  : "~me",
    "access_token": this.token,   
  };

  this._apiGet('appointments', data, function(err, res) {
    if(err) {
      return callback(err, null);
    }
    else if (res.response.status !== 200) {
      return callback('Unknown Error');
    }
    
    (res.response.data).sort(function(a, b){return a.start-b.start});
    return callback(null, res.response);
  });
};