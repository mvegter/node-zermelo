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


function requestSuccess(res) {
  var status = res.statusCode;
  var prefix = 'HTTP Error ' + status + ': ';

  switch(status) {
    case 200:
      return true;

    case 204:
      return prefix + 'No content!';

    case 302:
      var location = res.headers.location || '';
      if(location && location.indexOf('main/----success----?code=')) {
        return true;
      }
      return prefix + 'Rederict blocked!';

    case 400:
      return prefix + 'Unknown properties!';

    case 401:
      return prefix + 'Unauthorized request!';

    case 403:
      return prefix + 'Forbidden request!';

    case 404:
      return prefix + 'Page not found!';

    default:
      return prefix;
  }
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
    var success = requestSuccess(res);
    if(success !== true) {
      return callback(new Error(success));
    }

    var location = res.headers.location || '';
    if(location && location.indexOf('main/----success----?code=')) {
      var url = res.headers.location;
          url = url.substring(url.indexOf("=") + 1);
          url = url.substring(0, url.indexOf('&'));

      return callback(null, url);
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
    var success = requestSuccess(res);
    if(success !== true) {
      return callback(new Error(success));
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
