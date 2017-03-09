'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getSchedule = function(unixStart, unixEnd, callback) {
  if(!this.token) {
    return;
  }
  else if(!unixStart) {
    throw new Error('Missing Start Time (UNIX format)');
  }
  else if(!unixEnd) {
    throw new Error('Missing End Time (UNIX format)');
  }

  var start = Math.round(parseInt(unixStart));
  var end   = Math.round(parseInt(unixEnd));

  if(isNaN(start)) {
    return callback(new Error('Invalid UNIX at Start Time'));
  } else if(isNaN(end)) {
    return callback(new Error('Invalid UNIX at End Time'));
  }

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
