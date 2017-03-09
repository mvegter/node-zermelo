'use strict';

var Zermelo = require('../index.js');
var HTTP  = require('http');
var HTTPS = require('https');
var Zlib  = require('zlib');

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
    var location = res.headers.location || '';
    if(location && location.indexOf('main/----success----?code=')) {
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
    var head    = res.headers['content-encoding'] || '';
    var stream  = res;
    var responseData = "";
    

    if (head && head.toLowerCase() === 'gzip') {
      stream = Zlib.createGunzip();
      res.pipe(stream);
    }

    stream.on('data', function(data) {
      responseData += data;
    });

    stream.on('end', function() {
      callback(null, JSON.parse(responseData));
    });
  });

  req.on('error', function(err) {
    callback(err);
  });

  req.end(method === "POST" ? query : null);
};

Zermelo.prototype._apiGet = function(path, data, callback) {
  var query   = buildQueryString(data);
  var headers = getDefaultHeaders();
  var url     = 'https://'+this.school+'.zportal.nl/api/v3/'+path+'?'+query;

  var req = HTTPS.get(url, function(res) {
    if(res.statusCode !== 200) {
      return callback(new Error('HTTP Error: ' + res.statusCode));
    }
    var responseData  = '';

    res.on('data', function(data) {
      responseData += data;
    });

    res.on('end', function() {
      callback(null, JSON.parse(responseData));
    });    
  });

  req.on('error', function(err) {
    callback(new Error(err));
  });

  req.end();
};
