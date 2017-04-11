'use strict';

var http = require('http');
var https = require('https');
var Zlib  = require('zlib');

var Zermelo = require('../index.js');

function buildQuery(data) {
  var query = '';

  for (var i in data) {
    query += (query ? '&' : '') + i + '=';
    query += encodeURIComponent(data[i]);
  }

  return query;
};

function defaultHeaders() {
  return {
      'Accept'  : 'text/html,*/*;q=0.9'
    , 'Accept-Encoding' : 'gzip,identity,*;q=0'
    , 'Accept-Charset'  : 'ISO-8859-1,utf-8,*;q=0.7'
  };
};

Zermelo.prototype.Post = function(uri, data, callback) {
  data.format = 'json';

  var query   = buildQuery(data);
  var headers = defaultHeaders();
      uri     = '/api/v3/' + uri;

  headers['Content-Type']   = 'application/x-www-form-urlencoded';
  headers['Content-Length'] = Buffer.byteLength(query);

  var options = {
      'hostname': this._school + '.zportal.nl'
    , 'path'    : uri
    , 'method'  : 'POST'
    , 'headers' : headers
  };  

  var req = https.request(options, function(res) {
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
      return callback(null, JSON.parse(responseData));
    });
  });

  req.on('error', (err) => {
    return callback(err);
  });

  req.end(query);
};


Zermelo.prototype.Get = function(uri, data, callback) {
  var query   = buildQuery(data);
  var headers = defaultHeaders();  
  var url     = 'https://' + this._school + '.zportal.nl/api/v3/' + uri + '?' + query;

  console.log(url);

  https.get(url, (res) => {
    if(res.statusCode !== 200) {
      return callback(res.statusCode);
    }

    var responseData;
    res.on('data', (data) => {
      responseData += data;
    });

    res.on('end', () => {
      callback(null, JSON.parse(responseData));
    });
  }).on('error', (err) => {
    return callback(err);
  });
};
