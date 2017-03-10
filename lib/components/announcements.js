'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getAnnouncements = function(bool, callback) {
  if(!bool) {
    return callback(new Error('Missing Bool Parameter!'));
  }
};
