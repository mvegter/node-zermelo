const ZermeloSchedule = require('../lib/index.js');
const Zermelo1    = new ZermeloSchedule(SCHOOL);

Zermelo1.logOn({
  'username'  : USERNAME,
  'password'  : PASSWORD
}, (err) => {
  if(err) {
    console.error(err);
  }
  console.log('Logged in!');
});

const Zermelo2    = new ZermeloSchedule(SCHOOL, true);
const Zermelo3    = new ZermeloSchedule(SCHOOL, 'true');
const Zermelo5    = new ZermeloSchedule(SCHOOL, false);
const Zermelo6    = new ZermeloSchedule(SCHOOL, 'false');

const Zermelo7    = new ZermeloSchedule({'school': SCHOOL});
const Zermelo8    = new ZermeloSchedule({'School': SCHOOL});

const Zermelo9    = new ZermeloSchedule({'school': SCHOOL, 'secure': true});
const Zermelo10    = new ZermeloSchedule({'school': SCHOOL, 'secure': 'true'});
const Zermelo11   = new ZermeloSchedule({'school': SCHOOL, 'secure': false});
const Zermelo12   = new ZermeloSchedule({'school': SCHOOL, 'secure': 'false'});
