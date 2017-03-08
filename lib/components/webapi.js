'use strict';

var Zermelo = require('../index.js');
var HTTP  = require('http');
var HTTPS = require('https');
var Zlib  = require('zlib');

Zermelo.prototype._apiRequest = function(method, path, data, callback) {
  method = method.toUpperCase();

  data.format = 'json';

  var query   = buildQueryString(data);
  var headers = getDefaultHeaders();
      path    = '/api/v3/' + path;

  if(method === 'POST') {
    headers['Content-Type']   = 'application/x-www-form-urlencoded';
    headers['Content-Length'] = Buffer.byteLength(query);
  } else {
    path += '?' + query;
  }

  var options = {
    'hostname': this.school + '.zportal.nl',
    path,
    method,
    headers
  };

  var req = HTTPS.request(options, function(res) {
    if(res.headers.location && res.headers.location.indexOf('main/----success----?code=')) {
      var url = res.headers.location;
          url = url.substring(url.indexOf("=") + 1);
          url = url.substring(0, url.indexOf('&'));

      callback(null, url);
      return;
    }
    else if (res.statusCode === 400) {
      callback(new Error('Authorization Code Already Used!'));
    }
    else if(res.statusCode !== 200) {
      callback(new Error('HTTP error ' + res.statusCode));
      return;
    }
    var responseData = "";

    var stream = res;
    if (res.headers['content-encoding'] && res.headers['content-encoding'].toLowerCase() === 'gzip') {
      stream = Zlib.createGunzip();
      res.pipe(stream);
    }

    stream.on('data', function(data) {
      responseData += data;
    });

    stream.on('end', function() {
      callback(null, responseData);
    });
  });

  req.on('error', function(err) {
    callback(err);
  });

  req.end(method === "POST" ? query : null);
};

function buildQueryString(data) {
  var str = '';

  for (var i in data) {
    if (!data.hasOwnProperty(i)) {
      continue;
    }
    str += (str ? '&' : '') + i + '=';

    if (Buffer.isBuffer(data[i])) {
      str += data[i].toString('hex').replace(/../g, '%$&');
    } else {
      str += encodeURIComponent(data[i]);
    }
  }

  return str;
}

function getDefaultHeaders() {
  return {
    'Accept': 'text/html,*/*;q=0.9',
    'Accept-Encoding': 'gzip,identity,*;q=0',
    'Accept-Charset': 'ISO-8859-1,utf-8,*;q=0.7'
  };
}
