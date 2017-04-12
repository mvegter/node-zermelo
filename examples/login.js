const Schedule = require('../lib/index.js'); // use require('zermelo') in production
const Zermelo = new Schedule();

Zermelo.logOn({
  'school': 'SCHOOL',
  'username': 'USERNAME',
  'password': 'PASSWORD'
}, (err) => {
  if (err) {
    throw new Error(err);
  }

  console.log('Logged on!');
});
