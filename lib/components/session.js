'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getSession = function(callback) {
  if(!this.token || !this.expire) {
    return callback('Be sure to be logged in!');
  }
  return callback(null, {token: this.token, expire: this.expire});
};
