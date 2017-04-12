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

  var curr = new Date();
  var monday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  var friday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

  monday = Math.round(monday.getTime() / 1000);
  friday = Math.round(friday.getTime() / 1000);

  Zermelo.getSchedule(monday, friday, (err, res) => {
    if (err) {
      throw new Error(err);
    }
    console.log(res);
  });
});
