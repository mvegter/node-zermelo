'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.logOn = function(details) {
  if(!details) {
    throw new Error('Missing Login Credentials!');
  }
  else if(!this || this.loggedOn) {
    throw new Error('Already logged on, cannot log on again');
  }
  else if (!details.school) {
    throw new Error('Missing school parameter');
  }
  this.school = details.school;

  if(!details.authCode) {
    this.getCode(details);
  } else {
    this.setCode((details.authCode).replace(/[^0-9]/g, ''));
  }
};

Zermelo.prototype.getCode = function(user) {
  if(!user) {
    throw new Error('Missing User Parameter!');
  }

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
  if(!code) {
    throw new Error('Missing Code Parameter!');
  }

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
  if(!token) {
    throw new Error('Missing Token Parameter!');
  }

  this.token = token;
  this.loggedOn = true;
  this.emit('loggedOn');
};
