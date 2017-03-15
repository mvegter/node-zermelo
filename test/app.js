const ZermeloSchedule = require('../lib/index.js');
const Zermelo    = new ZermeloSchedule();

Zermelo.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
}, (err) => {
  if(err) {
    console.error(err);
  }

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
}, (err) => {
  if(err) {
    console.error(err);
  }

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
}, (err) => {
  if(err) {
    console.error(err);
  }
});

zermeloLog.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
  'password'  : process.env.password
}, (err) => {
  if(err) {
    console.error(err);
  }
});

const zermeloSchool  = new ZermeloSchedule();
zermeloLog.logOn({
  'username'  : process.env.username,
  'password'  : process.env.password
}, (err) => {
  if(err) {
    console.error(err);
  }
});


const zermeloCode  = new ZermeloSchedule();
zermeloCode.logOn({
  'school'    : process.env.school, 
  'authCode': '123 456 789'
}, (err) => {
  if(err) {
    console.error(err);
  }
});

const zermeloLog1    = new ZermeloSchedule();
zermeloLog1.logOn({
  'school'    : process.env.school, 
  'username'  : process.env.username,
}, (err) => {
  if(err) {
    console.error(err);
  }
});

const zermeloLog2    = new ZermeloSchedule();
zermeloLog2.logOn({
  'school'    : process.env.school, 
  'password'  : process.env.password
}, (err) => {
  if(err) {
    console.error(err);
  }
});
