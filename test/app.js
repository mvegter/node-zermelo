const ZermeloSchedule = require('../lib/index.js');
const Zermelo1    = new ZermeloSchedule(process.env.school);

Zermelo1.logOn({
  'username'  : process.env.username,
  'password'  : process.env.password
}, (err) => {
  if(err) {
    console.error(err);
  }
  console.log('Logged in!');
});

const Zermelo2    = new ZermeloSchedule(process.env.school, true);
const Zermelo3    = new ZermeloSchedule(process.env.school, 'true');
const Zermelo5    = new ZermeloSchedule(process.env.school, false);
const Zermelo6    = new ZermeloSchedule(process.env.school, 'false');

const Zermelo7    = new ZermeloSchedule({'school': process.env.school});
const Zermelo8    = new ZermeloSchedule({'School': process.env.school});

const Zermelo9    = new ZermeloSchedule({'school': process.env.school, 'secure': true});
const Zermelo10    = new ZermeloSchedule({'school': process.env.school, 'secure': 'true'});
const Zermelo11   = new ZermeloSchedule({'school': process.env.school, 'secure': false});
const Zermelo12   = new ZermeloSchedule({'school': process.env.school, 'secure': 'false'});
