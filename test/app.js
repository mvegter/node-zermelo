const ZermeloSchedule = require('../lib/index.js'); // use require('zermelo') in production
const Zermelo         = new ZermeloSchedule();


Zermelo.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

Zermelo.on('loggedOn', function() {
  Zermelo.getAnnouncements('true', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res);
    }
  });

  Zermelo.getSchedule('1488668400', '1489359540', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res);
    }
  });

  Zermelo.getTeacher('1488668400', '1489359540', 'harm', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res);
    }
  });

  Zermelo.getClassroom('1488668400', '1489359540', 'n316', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res);
    }
  });

  Zermelo.getSubject('1488668400', '1489359540', 'maat', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res);
    }
  }); 

  Zermelo.getGroup('1488668400', '1489359540', 'wh5.nat2', function(err, res) {
    if(err) {
      console.log(err);
    }

    if(!err && res) {
      console.log(res);
    }
  });   
});
