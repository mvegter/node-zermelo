'use strict';

const Request = require('request');
const Session = require('./session.js');

function Zermelo (userOptions) {
  const _option = userOptions || {}
      , options = {};

  var   keys  = Object.keys(_option)
      , num   = keys.length;

  while(num--) {
    var key = keys[num];
    options[key.toLowerCase()] = _option[key];
  }

  if(!options.school) {
    throw new Error('Missing School Parameter');
  }
  this._school = options.school;

  if(!options.authcode && (!options.username && !options.password)) {
    throw new Error('Either use login credentials or an authorization code!');
  }
  else if (options.username && !options.password) {
    throw new Error('Missing Password!');
  }
  else if (!options.username && options.password) {
    throw new Error('Missing Username!');
  }
  else if (options.username && options.password) {
    this._username = options.username;
    this._password = options.password;
  }
  else if (!options.authcode) {
    throw new Error('Missing AuthCode!');
  }
  else if (options.authcode) {
    this._authcode = (options.authcode).replace(/[^0-9]/g, '');
  }
  else {
    throw new Error('Unknown Verification Method');
  }

  Request.post({
    url: 'https://'+this._school+'.zportal.nl/api/v3/oauth/token',
    formData: {
      "grant_type": "authorization_code",
      'code': this._authcode
    }
  }, (err, response, body) => {
    if(err) {
      throw new Error(err);
    }

    if(response.statusCode === 400) {
      throw new Error('AuthCode already used!');
    }
    else if(response.statusCode === 200) {
      var jsonBody = JSON.parse(body);
      this.session = new Session(jsonBody);
    }
    else {
    	throw new Error('Unknown error occured: '+response.statusCode);
    }
  }); 
}

module.exports = Zermelo;
