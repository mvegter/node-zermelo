'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype._getAnnouncements = function(bool, callback) {
	if(!this.token) {
		return;
	}

	var data = {
		'current' : bool,
		'user': '~me',
		'access_token': this.token
	};

	this._apiRequest('announcements', function(err, res) {
		if(err) {
			throw new Error(err);
		}

		console.log(res);

	});
};
