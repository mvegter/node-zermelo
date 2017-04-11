'use strict';

function Zermelo (inputSchool, inputSecure) {
  var inputSchoolType = typeof inputSchool;
  var inputSecureType = typeof inputSecure;

  switch (inputSchoolType) {
    case 'string':
      this._school = inputSchool;
      break;

    case 'object':
      this._school = inputSchool.school || '';
      this._secure = inputSchool.secure || true;
      break;

    default:
      throw new Error('School parameter must be string or object; not ' + inputSchoolType);
  }

  switch (inputSecureType) {
    case 'boolean':
      this._secure = inputSecure;
      break;

    case 'string':
      inputSecure = inputSecure.toLowerCase();
      switch (inputSecure) {
        case 'true':
          this._secure = true;
          break;

        case 'false':
          this._secure = false;
          break;

        default:
          this.call('debug', '[Zermelo] Secure parameter not supplied;  using default: true!');
          this._secure = true;
          break;
      }
      break;

    default:
      this.call('debug', '[Zermelo] Secure parameter not supplied;  using default: true!');
      this._secure = true;
      break;
  }
  this.call('debug', '[Zermelo] Successfully set School (' + this._school + ') and Secure (' + this._secure + ')');
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

require('./components/http.js');
require('./components/logon.js');
require('./components/schedule.js');
