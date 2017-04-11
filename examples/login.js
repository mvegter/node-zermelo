const Schedule = require('zermelo');
const Zermelo  = new ZermeloSchedule('SCHOOL_NAME');

Zermelo.logOn({
  'username'  : 'USERNAME',
  'password'  : 'PASSWORD'
}, (err) => {
  if(err) {
    throw new Error(err);
  }

  console.log('Logged on!');
});
