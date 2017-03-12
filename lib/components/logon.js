'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.logOn = function(details) {
  if(this.loggedOn) {
    return ('Already logged on, cannot log on again');
  }
  else if (!details.school) {
    return ('Missing school parameter');
  }
  this.school = details.school;

  if(!details.authCode) {
    this.getCode(details);
    return;
  } 
  else {
    this.setCode((details.authCode).replace(/[^0-9]/g, ''));
    return;
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

  this._apiRequest('oauth', data, function(err, res) {
    if(err) {
      return console.error(err);
    }
    return self.setCode(res);
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

  this._apiRequest('oauth/token', data, function(err, res) {
    if(err) {
      return ('error', 'Invalid AuthCode Given!');
    } 
    return self.setToken(res.access_token);
  }); 
};

Zermelo.prototype.setToken = function(token) {
  this.token = token;
  this.loggedOn = true;
  this.emit('loggedOn');
};
