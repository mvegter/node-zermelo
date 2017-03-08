'use strict';

require('util').inherits(Zermelo, require('events').EventEmitter);

function Zermelo (options) {

};

module.exports = Zermelo;

require('./components/logon.js');
require('./components/webapi.js');
require('./components/schedule.js');
// require('./components/session.js');
