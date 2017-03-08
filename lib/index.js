'use strict';

module.exports = Zermelo;

function Zermelo (options) {
  var options = options || {};

  this.school = options;
};

require('./components/logon.js');
require('./components/webapi.js');
// require('./components/session.js');
