'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.logOn = function(details) {
  if(this.loggedOn) {
    throw new Error('Already logged on, cannot log on again');
  }

  this.school = details.school;

  if(!details.authCode) {
    this.getCode(details);
  } else {
    this.setCode((details.authCode).replace(/[^0-9]/g, ''));
  }
};

Zermelo.prototype.getCode = function(user) {
  var self = this;

  var data = {
    "username"      : user.username,
    "password"      : user.password,
    "client_id"     : 'OAuthPage',
    "redirect_uri"  : '/main/----success----',
    "scope"         : '',
    "state"         : '',
    "response_type" : 'code'
  };

  this._apiRequest('POST', 'oauth', data, function(err, res) {
    if(err) {
      console.error(err);
    } 
    else if (!err && res) {
      self.setCode(res);
    }
  }); 
};

Zermelo.prototype.setCode = function(code) {
  this.authcode = code;
  this.getToken();
};

Zermelo.prototype.getToken = function() {
  var self = this;

  var data = {
    "grant_type": "authorization_code",
    'code': this.authcode
  };

  this._apiRequest('POST', 'oauth/token', data, function(err, res) {
    if(err) {
      throw new Error(err);
    } else {
      self.setToken(res.access_token);
    }
  }); 
};

Zermelo.prototype.setToken = function(token) {
  this.token = token;
  this.emit('loggedOn');
};
