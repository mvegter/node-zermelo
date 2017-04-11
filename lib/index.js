'use strict'

require('util').inherits(Zermelo, require('events').EventEmitter)

module.exports = Zermelo

function Zermelo (inputSchool, inputSecure) {
  if (typeof inputSchool === 'undefined') {
    throw new Error('School parameter not supplied; it is necessary to run!')
  } else if (typeof inputSchool === 'string') {
    this._school = escape(inputSchool)

    var inputSecureType = typeof inputSecure
    switch (inputSecureType) {
      case 'undefined':
        this.call('debug', 'Secure parameter not supplied;  using default: true!')
        this._secure = true
        break

      case 'boolean':
        this._secure = inputSecure
        break

      case 'string':
        inputSecure = escape(inputSecure).toLowerCase()
        switch (inputSecure) {
          case 'true':
            this._secure = true
            break

          case 'false':
            this._secure = false
            break

          default:
            throw new Error('Secure parameter must be TRUE or FALSE; not ' + inputSecure)
        }
        break

      default:
        throw new Error('Secure parameter must be boolean; not ' + inputSecureType)
    }
  } else if (typeof inputSchool === 'object') {
    var options = inputSchool

    var inputSchoolType
    var inputSchoolType1 = typeof options.school
    var inputSchoolType2 = typeof options.School

    if (inputSchoolType1 === 'undefined' && inputSchoolType2 !== 'undefined') {
      inputSchool = options.School
      inputSchoolType = inputSchoolType2
    } else if (inputSchoolType1 !== 'undefined' && inputSchoolType2 === 'undefined') {
      inputSchool = options.school
      inputSchoolType = inputSchoolType1
    } else {
      inputSchoolType = 'undefined'
    }

    switch (inputSchoolType) {
      case 'undefined':
        throw new Error('School parameter not supplied; it is necessary to run!')
        break

      case 'string':
        this._school = escape(inputSchool)

        var inputSecureType
        var inputSecureType1 = typeof options.secure
        var inputSecureType2 = typeof options.Secure

        if (inputSecureType1 === 'undefined' && inputSecureType2 !== 'undefined') {
          inputSecure = options.Secure
          inputSecureType = inputSecureType2
        } else if (inputSecureType1 !== 'undefined' && inputSecureType2 === 'undefined') {
          inputSecure = options.secure
          inputSecureType = inputSecureType1
        } else {
          inputSecureType = 'undefined'
        }

        switch (inputSecureType) {
          case 'undefined':
            this.call('debug', 'Secure parameter not supplied;  using default: true!')
            this._secure = true
            break

          case 'boolean':
            this._secure = (escape(inputSecure) === 'true')
            break

          case 'string':
            inputSecure = escape(inputSecure).toLowerCase()
            switch (inputSecure) {
              case 'true':
                this._secure = true
                break

              case 'false':
                this._secure = false
                break

              default:
                throw new Error('Secure parameter must be TRUE or FALSE; not ' + inputSecure)
            }
            break

          default:
            throw new Error('Secure parameter must be boolean; not ' + inputSecureType)
        }
        break

      default:
        throw new Error('School parameter must be string; not ' + inputSchoolType)
    }
  } else {
    throw new Error('School parameter must be string or object; not ' + typeof inputSchool)
  }

  this.call('debug', '[Zermelo] Successfully set School (' + this._school + ') and Secure (' + this._secure + ')')
};

Zermelo.prototype.call = function (emitEvent, emitData = '') {
  var self = this

  emitData = emitData.split(' ')
  while (emitData[0].length < 10) {
    emitData[0] = ' ' + emitData[0]
  }
  emitData = emitData.join(' ')

  setImmediate(function () {
    self.emit(emitEvent, emitData)
  })
}

require('./components/http.js')
require('./components/logon.js')
require('./components/schedule.js')
