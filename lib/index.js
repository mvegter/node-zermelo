'use strict'
const request = require('request');

module.exports = Zermelo;

function Zermelo (options) {
  options = options || {};

  if(!options.school) {
    throw new Error('Missing School Parameter');
  }
  this._school = options.school;

  if(!options.authCode && (!options.username && !options.password)) {
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
  else if (!options.authCode) {
    throw new Error('Missing AuthCode!');
  }
  else if (options.authCode) {
    this._authcode = (options.authCode).replace(/[^0-9]/g, '');
  }
  else {
    throw new Error('Unknown Verification Method');
  }

  request.post({
    url: 'https://'+this._school+'.zportal.nl/api/v3/oauth/token',
    form: {
      "grant_type": "authorization_code",
      'code': this._authcode
    }
  }, (err, response, body) => {
    if(err) {
      throw new Error(err);
    }

    if(response.statusCode == 400) {
      throw new Error('AuthCode already used!');
    }
    else if(response.statusCode == 200) {
      var jsonBody = JSON.parse(body);
      
      console.log(this);
    }
  });  
}
