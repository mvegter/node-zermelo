'use strict';

var Zermelo = require('../index.js');

function validUnix(unixTimestamp) {
  var date = new Date(unixTimestamp);
  console.log(date instanceof Date && !isNaN(date.valueOf()));
}

Zermelo.prototype.getSchedule = function (unixStart, unixEnd, callback) {
  unixStart = Math.round(parseInt(unixStart));
  unixEnd = Math.round(parseInt(unixEnd));

  validUnix(unixStart);

  if (isNaN(unixStart) || !validUnix(unixStart)) {
    return callback('Invalid UNIX at Start Time');
  } 
  else if (isNaN(unixEnd) || !validUnix(unixEnd)) {
    return callback('Invalid UNIX at End Time');
  }

  var data = {
    'start': unixStart,
    'end': unixEnd,
    'user': '~me',
    'access_token': this._token
  };

  this.Get('appointments', data, function (err, res) {
    if (err) {
      return callback(err, null);
    }

    (res.data).sort((a, b) => { return a.start - b.start; });
    return callback(null, res);
  });
};
