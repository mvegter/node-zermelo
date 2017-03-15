'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.logOn = function(details, callback) {
  if(this.loggedOn) {
    return callback('Already logged on, cannot log on again');
  }
  else if (!details.school) {
    return callback('Missing school parameter');
  }
  this.school = details.school;

  if(!details.authCode) {
    this.getCode(details, (err) => {
      if(err) {
        return callback(err);
      }
    });
  } 
  else {
    self.setCode((details.authCode).replace(/[^0-9]/g, ''), (err) => {
      if(err) {
        return callback(err);
      }
      return callback(null);
    });
  }
};

Zermelo.prototype.getCode = function(user, callback) {
  if(!user.username) {
    return callback('Missing username!');
  }
  else if (!user.password) {
    return callback('Missing password!');
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

  this._apiRequest('oauth', data, function(err, res) {
    if(err) {
      return callback(err);
    }

    self.setCode(res, (err) => {
      if(err) {
        return callback(err);
      }
      return callback(null);
    });
  });  
};

Zermelo.prototype.setCode = function(code, callback) {
  this.authcode = code;

  this.getToken((err) => {
    if(err) {
      return callback(err);
    }
    return callback(null);  
  });
};

Zermelo.prototype.getToken = function(callback) {
  if(!this.authcode) {
    return callback('Missing AuthCode!');
  }

  var self = this;

  var data = {
    "grant_type": "authorization_code",
    'code': this.authcode
  };

  this._apiRequest('oauth/token', data, function(err, res) {
    if(err) {
      if(err === 400) {
        return callback('Invalid AuthCode Given!');
      }
      return callback(err);
    }
    self.setToken(res.access_token, (err) => {
      if(err) {
        return callback(err);
      }
      return callback(null);
    });
  }); 
};

Zermelo.prototype.setToken = function(token, callback) {  
  this.token = token;
  this.loggedOn = true;

  return callback(null);
};
