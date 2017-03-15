'use strict';

var Zermelo = require('../index.js');
var HTTP  = require('http');
var HTTPS = require('https');
var Zlib  = require('zlib');

function buildQueryString(data) {
  var str = '';

  for (var i in data) {
    str += (str ? '&' : '') + i + '=';
    str += encodeURIComponent(data[i]);
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

Zermelo.prototype._apiRequest = function(path, data, callback) {
  data.format = 'json';

  var query   = buildQueryString(data);
  var headers = getDefaultHeaders();
      path    = '/api/v3/' + path;

  headers['Content-Type']   = 'application/x-www-form-urlencoded';
  headers['Content-Length'] = Buffer.byteLength(query);

  var options = {
    'hostname': this.school + '.zportal.nl',
    path,
    'method' : 'POST',
    headers
  };

  var req = HTTPS.request(options, function(res) {
    if(res.statusCode !== 200 && res.statusCode !== 302) {
      return callback(res.statusCode);
    }

    var location = res.headers.location;
    if(location && location.indexOf('main/----success----?code=')) {
      var url = res.headers.location;
          url = url.substring(url.indexOf("=") + 1);
          url = url.substring(0, url.indexOf('&'));

      return callback(null, url);
    }

    var head    = res.headers['content-encoding'];
    var stream  = res;
    var responseData = "";
    

    stream = Zlib.createGunzip();
    res.pipe(stream);

    stream.on('data', (data) => {
      responseData += data;
    });

    stream.on('end', () => {
      callback(null, JSON.parse(responseData));
    });
  });

  req.on('error', (err) => {
    return callback(new Error(err));
  });

  req.end(query);
};

Zermelo.prototype._apiGet = function(path, data, callback) {
  var query   = buildQueryString(data);
  var headers = getDefaultHeaders();
  var url     = 'https://'+this.school+'.zportal.nl/api/v3/'+path+'?'+query;

  var req = HTTPS.get(url, function(res) {
    if(res.statusCode !== 200) {
      return callback(new Error(res.statusCode));
    }

    var responseData  = '';
    res.on('data', (data) => {
      responseData += data;
    });

    res.on('end', () => {
      callback(null, JSON.parse(responseData).response);
    });    
  });

  req.on('error', (err) => {
    return callback(new Error(err));
  });

  req.end();
};
