'use strict'

var Zermelo = require('../index.js')

Zermelo.prototype.logOn = function (userDetails, callback) {
  if (this._loggedOn) {
    return callback('Already logged on; only one session allowed!')
  }

  this.GetAuthCode(userDetails, (err) => {
    if (err) {
      return callback(err)
    }
    return callback(null)
  })
}

Zermelo.prototype.GetAuthCode = function (userDetails, callback) {
  if (!userDetails.username) {
    return callback('Missing username!')
  } else if (!userDetails.password) {
    return callback('Missing password!')
  }

  var self = this

  var data = {
    'username': userDetails.username,
    'password': userDetails.password,
    'client_id': 'OAuthPage',
    'redirect_uri': '/main/----success----',
    'scope': '',
    'state': '',
    'response_type': 'code'
  }

  this.Post('oauth', data, function (err, res) {
    if (err) {
      return callback(err)
    }

    self.SetCode(res, (err) => {
      if (err) {
        return callback(err)
      }
      return callback(null)
    })
  })
}

Zermelo.prototype.SetCode = function (code, callback) {
  this._authCode = code

  this.getToken((err) => {
    if (err) {
      return callback(err)
    }
    return callback(null)
  })
}

Zermelo.prototype.getToken = function (callback) {
  if (!this._authCode) {
    return callback('Missing AuthCode!')
  }

  var data = {
    'grant_type': 'uthorization_code',
    'code': this._authCode
  }

  var self = this
  this.Post('oauth/token', data, function (err, res) {
    if (err) {
      if (err === 400) {
        return callback('Invalid AuthCode Given!')
      }
      return callback(err)
    }

    self.SetToken(res, (err) => {
      if (err) {
        return callback(err)
      }
      return callback(null)
    })
  })
}

Zermelo.prototype.SetToken = function (data, callback) {
  this._token = data.access_token
  this._expire = Date.now() + data.expires_in
  this._loggedOn = true

  return callback(null)
}
