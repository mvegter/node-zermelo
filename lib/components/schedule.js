'use strict'

var Zermelo = require('../index.js')

Zermelo.prototype.getSchedule = function (unixStart, unixEnd, callback) {
  unixStart = Math.round(parseInt(unixStart))
  unixEnd = Math.round(parseInt(unixEnd))

  if (isNaN(unixStart) || !((new Date(unixStart)).getTime() > 0)) {
    return callback('Invalid UNIX at Start Time')
  } else if (isNaN(unixEnd) || !((new Date(unixEnd)).getTime() > 0)) {
    return callback('Invalid UNIX at End Time')
  }

  var data = {
    'start': unixStart,
    'end': unixEnd,
    'user': '~me',
    'access_token': this._token
  }

  this.Get('appointments', data, function (err, res) {
    if (err) {
      return callback(err, null)
    }

    (res.data).sort((a, b) => { return a.start - b.start })
    return callback(null, res)
  })
}
