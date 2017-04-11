const Schedule = require('zermelo');
const Zermelo = new Schedule('SCHOOL_NAME');

Zermelo.logOn({
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
