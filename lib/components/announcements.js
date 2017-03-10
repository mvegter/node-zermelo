'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getAnnouncements = function(bool, callback) {
  if(typeof bool === undefined) {
    callback(new Error('Missing Bool Parameter!'));
    return;
  }









  else if(bool) {
    callback(null, 'success');
    return;
  }
  else
  {
    callback(new Error('Unknown Error Occured!'));
    return; 
  }
};
