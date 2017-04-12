'use strict';

function Zermelo () {
  this.call('debug', '[Zermelo] Successfully initialized!');
}

module.exports = Zermelo;
require('util').inherits(Zermelo, require('events').EventEmitter);

Zermelo.prototype.call = function (emitEvent, emitData = '') {
  var self = this;

  emitData = emitData.split(' ');
  while (emitData[0].length < 10) {
    emitData[0] = ' ' + emitData[0];
  }
  emitData = emitData.join(' ');

  setImmediate(function () {
    self.emit(emitEvent, emitData);
  });
};

require('./components/announcements.js');
require('./components/http.js');
require('./components/logon.js');
require('./components/schedule.js');
