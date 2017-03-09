'use strict';

var Zermelo = require('../index.js');

Zermelo.prototype.getSchedule = function(unixStart, unixEnd, callback, a='') {
  if(!this.token) {
    return;
  }
  else if(!unixStart) {
    throw new Error('Missing Start Time (UNIX format)');
  }
  else if(!unixEnd) {
    throw new Error('Missing End Time (UNIX format)');
  }

  var start = Math.round(parseInt(unixStart));
  var end   = Math.round(parseInt(unixEnd));

  if(isNaN(start)) {
    return callback(new Error('Invalid UNIX at Start Time'));
  } else if(isNaN(end)) {
    return callback(new Error('Invalid UNIX at End Time'));
  }

  var data = {
    start,
    end,
    "user"  : "~me",
    "access_token": this.token,   
  };

  this._apiGet('appointments', data, function(err, res) {
    if(err) {
      return callback(err, null);
    }

    else if (!err && res) {
      (res.data).sort(function(a, b){return a.start-b.start;});
      return callback(null, res);
    }
  });
};

Zermelo.prototype.getTeacher = function(unixStart, unixEnd, teacher, callback) {
  teacher = teacher.toLowerCase();

  if(!unixStart) {
    throw new Error('Missing Start Time (UNIX format)');
  }
  else if(!unixEnd) {
    throw new Error('Missing End Time (UNIX format)');
  }

  this.getSchedule(unixStart, unixEnd, function(err, res) {
    if(err) {
      return callback(new Error(err));
    }

    for (var i = res.data.length - 1; i >= 0; i--) {
      if(res.data[i].teachers[0] !== teacher) {
        res.data.splice(i, 1);
      }
    };
    res.endRow    = res.data.length;
    res.totalRows = res.data.length;
    (res.data).sort(function(a, b){return a.start-b.start;});
    return callback(null, res);
  });
};

Zermelo.prototype.getClassroom = function(unixStart, unixEnd, location, callback) {
  location = location.toLowerCase();

  if(!unixStart) {
    throw new Error('Missing Start Time (UNIX format)');
  }
  else if(!unixEnd) {
    throw new Error('Missing End Time (UNIX format)');
  }

  this.getSchedule(unixStart, unixEnd, function(err, res) {
    if(err) {
      return callback(new Error(err));
    }

    for (var i = res.data.length - 1; i >= 0; i--) {
      if(res.data[i].locations[0] !== location) {
        res.data.splice(i, 1);
      }
    };
    res.endRow    = res.data.length;
    res.totalRows = res.data.length;
    (res.data).sort(function(a, b){return a.start-b.start;});
    return callback(null, res);
  });
};

Zermelo.prototype.getSubject = function(unixStart, unixEnd, subject, callback) {
  subject = subject.toLowerCase();

  if(!unixStart) {
    throw new Error('Missing Start Time (UNIX format)');
  }
  else if(!unixEnd) {
    throw new Error('Missing End Time (UNIX format)');
  }

  this.getSchedule(unixStart, unixEnd, function(err, res) {
    if(err) {
      return callback(new Error(err));
    }

    for (var i = res.data.length - 1; i >= 0; i--) {
      if(res.data[i].subjects[0] !== subject) {
        res.data.splice(i, 1);
      }
    };
    res.endRow    = res.data.length;
    res.totalRows = res.data.length;
    (res.data).sort(function(a, b){return a.start-b.start;});
    return callback(null, res);
  });
};

Zermelo.prototype.getGroup = function(unixStart, unixEnd, group, callback) {
  group = group.toLowerCase();

  if(!unixStart) {
    throw new Error('Missing Start Time (UNIX format)');
  }
  else if(!unixEnd) {
    throw new Error('Missing End Time (UNIX format)');
  }

  this.getSchedule(unixStart, unixEnd, function(err, res) {
    if(err) {
      return callback(new Error(err));
    }

    for (var i = res.data.length - 1; i >= 0; i--) {
      if(res.data[i].groups[0] !== group) {
        res.data.splice(i, 1);
      }
    };
    res.endRow    = res.data.length;
    res.totalRows = res.data.length;
    (res.data).sort(function(a, b){return a.start-b.start;});
    return callback(null, res);
  });
};
