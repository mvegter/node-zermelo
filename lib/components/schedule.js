'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getSchedule = function(unixStart, unixEnd, callback) {
  var start = Math.round(parseInt(unixStart));
  var end   = Math.round(parseInt(unixEnd));

  if(isNaN(start) || !((new Date(start)).getTime() > 0)) {
    return callback('Invalid UNIX at Start Time');
  } else if(isNaN(end) || !((new Date(end)).getTime() > 0)) {
    return callback('Invalid UNIX at End Time');
  }

  var data = {
    start,
    end,
    "user"  : "~me",
    "access_token": this.token,   
  };

  this._apiGet('appointments', data, function(err, res) {
    if(err) {
      return callback(err, null);
    }
    (res.data).sort((a, b) => {return a.start-b.start;});
    return callback(null, res);
  });
};

Zermelo.prototype.getUnique = function(unixStart, unixEnd, uniqueKey, uniqueValue, callback) {
  uniqueKey = uniqueKey.toLowerCase() + 's';
  var possiblities = ['subjects', 'teachers', 'groups', 'locations'];

  if(possiblities.indexOf(uniqueKey) < 0) {
    return callback('Invalid Unique Key! Use: subject, teacher, group or location');
  }

  this.getSchedule(unixStart, unixEnd, function(err, res) {
    if(err) {
      return callback(err);
    }

    for (var i = res.data.length - 1; i >= 0; i--) {
      if(res.data[i][uniqueKey][0] !== uniqueValue) {
        res.data.splice(i, 1);
      }
    };
    res.endRow    = res.data.length;
    res.totalRows = res.data.length;
    (res.data).sort((a, b) => {return a.start-b.start;});
    return callback(null, res);
  });
};
