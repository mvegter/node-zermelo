'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getAnnouncements = function(bool, callback) {
  if(typeof bool === undefined) {
    return callback(new Error('Missing Bool Parameter!'));
  }









  else if(bool) {
    return callback(null, 'success');
  }
  else
  {
    return callback(new Error('Unknown Error Occured!'));    
  }
};
