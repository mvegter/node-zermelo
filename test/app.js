const ZermeloSchedule = require('../lib/index.js'); // use require('zermelo') in production
const Zermelo         = new ZermeloSchedule();


Zermelo.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

Zermelo.on('loggedOn', function() {
  Zermelo.getSchedule('1489016804', '1489276004', function(err, res) {
    if(err) {
    	throw new Error(err);
    }
    if(!err && res) {
    	console.log(res);
    }
  });
});
