const ZermeloSchedule = require('../lib/index.js');
const Zermelo    = new ZermeloSchedule();

Zermelo.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

Zermelo.on('loggedOn', function() {
  Zermelo.getUnique('1488668400', '1489359540', 'location', 'n008', (err, res) => {
    if(err) {
      return console.error(err);
    }
    console.log(res.status);
  });

  Zermelo.getUnique('1488668400', '1489359540', 'locations', 'n008', (err, res) => {
    if(err) {
      console.error(err);
    }
    else if (!err && res) {
      console.log(res.status);
    }
  });

  Zermelo.getUnique('1488668400', '1489359540', 'location', 'n008', (err, res) => {
    if(err) {
      console.error(err);
    }
    else if (!err && res) {
      console.log(res.status);
    }
  });

  Zermelo.getUnique('abc', '1489359540', 'location', 'n008', (err, res) => {
    if(err) {
      console.error(err);
    }
    else if (!err && res) {
      console.log(res.status);
    }
  });

  Zermelo.getUnique('1488668400', 'abc', 'location', 'n008', (err, res) => {
    if(err) {
      console.error(err);
    }
    else if (!err && res) {
      console.log(res.status);
    }
  });    
});

const zermeloAnnounce    = new ZermeloSchedule();
zermeloAnnounce.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

zermeloAnnounce.on('loggedOn', function() {

  zermeloAnnounce.getAnnouncements('true', function (err, res) {
    if(err) {
      return console.error(err);
    }
    console.log(res.status);
  });

  zermeloAnnounce.getAnnouncements('false', function (err, res) {
    if(err) {
      return console.error(err);
    }
    console.log(res.status);
  });  

  zermeloAnnounce.getAnnouncements('tru', function (err, res) {
    if(err) {
      return console.error(err);
    }
    console.log(res.status);
  });

  zermeloAnnounce.getAnnouncements('fals', function (err, res) {
    if(err) {
      return console.error(err);
    }
    console.log(res.status);
  });  
});

const zermeloLog    = new ZermeloSchedule();
zermeloLog.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
});

zermeloLog .on('loggedOn', function() {
  zermeloLog.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
  });    
});

const zermeloSchool  = new ZermeloSchedule();
zermeloSchool.logOn({
  'username'  : process.env.username,
  'password'  : process.env.password
});

zermeloLog .on('loggedOn', function() {  
});


const zermeloCode  = new ZermeloSchedule();
zermeloCode.logOn({
  'school'    : process.env.school, 
  'authCode': '123 456 789'
});

zermeloCode .on('loggedOn', function() {  
});