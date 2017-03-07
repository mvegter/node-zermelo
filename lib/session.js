'use strict';

function Session(options) {
	this._token  = options.access_token;
	this._expire = Date.now() + options.expires_in;
}

module.exports = Session;
