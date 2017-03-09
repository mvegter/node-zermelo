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
});
