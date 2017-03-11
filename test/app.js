const ZermeloSchedule = require('../lib/index.js');

/* */

const ZermeloLogin    = new ZermeloSchedule();

ZermeloLogin.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

ZermeloLogin.on('loggedOn', function() {
  console.log(1 + ' Logged In');

});

ZermeloLogin.on('error', (err) => {
  console.log(1 + err);
});

/* */

const ZermeloAuthCode    = new ZermeloSchedule();

ZermeloAuthCode.logOn({
  'school'    : process.env.school,
  'authCode'  : '123 456 789'
});

ZermeloAuthCode.on('loggedOn', function() {
  console.log(2 + ' Logged In');
});

ZermeloAuthCode.on('error', (err) => {
  console.log(2 + err);
});

/* */

const ZermeloFunction    = new ZermeloSchedule();

ZermeloFunction.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

ZermeloFunction.on('loggedOn', function() {
  console.log(1 + ' Logged In');

  ZermeloFunction.getAnnouncements('true', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunction.getAnnouncements('false', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });  

  ZermeloFunction.getSchedule('1488668400', '1489359540', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunction.getTeacher('1488668400', '1489359540', 'harm', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunction.getClassroom('1488668400', '1489359540', 'n316', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunction.getSubject('1488668400', '1489359540', 'maat', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  }); 

  ZermeloFunction.getGroup('1488668400', '1489359540', 'wh5.nat2', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  }); 
});

ZermeloFunction.on('error', (err) => {
  console.log(3 + err);
});

/* */

const ZermeloFunctionInvalid    = new ZermeloSchedule();

ZermeloFunctionInvalid.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

ZermeloFunctionInvalid.on('loggedOn', function() {
  console.log(1 + ' Logged In');

  ZermeloFunctionInvalid.getAnnouncements('fals', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid.getSchedule('abc', 'def', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid.getTeacher('abc', 'def', 'harm', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid.getClassroom('abc', 'def', 'n316', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid.getSubject('abc', 'def', 'maat', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  }); 

  ZermeloFunctionInvalid.getGroup('abc', 'def', 'wh5.nat2', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  }); 
});

ZermeloFunctionInvalid.on('error', (err) => {
  console.log(4 + err);
});

/* */

const ZermeloFunctionInvalid2    = new ZermeloSchedule();

ZermeloFunctionInvalid2.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

ZermeloFunctionInvalid.on('loggedOn', function() {
  console.log(1 + ' Logged In');

  ZermeloFunctionInvalid2.getAnnouncements('tru', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid2.getSchedule('1488668400', 'def', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid2.getTeacher('1488668400', 'def', 'harm', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid2.getClassroom('1488668400', 'def', 'n413', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid2.getSubject('1488668400', 'def', 'maat', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  }); 

  ZermeloFunctionInvalid2.getGroup('1488668400', 'def', 'wh5.nat2', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  }); 
});

ZermeloFunctionInvalid2.on('error', (err) => {
  console.log(4 + err);
});

/* */

const ZermeloFunctionInvalid3    = new ZermeloSchedule();

ZermeloFunctionInvalid3.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});
  ZermeloFunctionInvalid3.getAnnouncements('fals', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid3.getSchedule('1488668400', 'def', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid3.getTeacher('abc', 'def', 'harm', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid3.getClassroom('abc', 'def', 'n316', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid3.getSubject('abc', 'def', 'maat', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  }); 

  ZermeloFunctionInvalid3.getGroup('abc', 'def', 'wh5.nat2', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  }); 

ZermeloFunctionInvalid3.on('error', (err) => {
  console.log(4 + err);
});

/* */

const ZermeloFunctionInvalid4    = new ZermeloSchedule();

ZermeloFunctionInvalid4.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

ZermeloFunctionInvalid4.on('loggedOn', function() {
  console.log(1 + ' Logged In');

  ZermeloFunctionInvalid4.getSchedule('1488668400', 'has', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunctionInvalid4.getSchedule('1488668400', 'has', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });

  ZermeloFunction.getClassroom('1488668400', '1489359540', 'n413', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res.status);
    }
  });  
});
