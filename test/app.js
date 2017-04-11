const ZermeloSchedule = require('../lib/index.js');
const Zermelo1 = new ZermeloSchedule(process.env.school);

Zermelo1.logOn({
  'username': process.env.username,
  'password': process.env.password
}, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('Logged in!');

  var curr = new Date();
  var monday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  var friday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

  monday = Math.round(monday.getTime() / 1000);
  friday = Math.round(friday.getTime() / 1000);

  Zermelo1.getSchedule(monday, friday, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log('Got schedule!');
  });

  Zermelo1.getSchedule('asdf', friday, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log('Got schedule!');
  });

  Zermelo1.getSchedule(monday, 'asdf', (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log('Got schedule!');
  });
});

const Zermelo2 = new ZermeloSchedule(process.env.school, true);
const Zermelo3 = new ZermeloSchedule(process.env.school, 'true');
const Zermelo5 = new ZermeloSchedule(process.env.school, false);
const Zermelo6 = new ZermeloSchedule(process.env.school, 'false');

const Zermelo7 = new ZermeloSchedule({'school': process.env.school});
const Zermelo8 = new ZermeloSchedule({'School': process.env.school});

const Zermelo9 = new ZermeloSchedule({'school': process.env.school, 'secure': true});
const Zermelo10 = new ZermeloSchedule({'school': process.env.school, 'secure': 'true'});
const Zermelo11 = new ZermeloSchedule({'school': process.env.school, 'secure': false});
const Zermelo12 = new ZermeloSchedule({'school': process.env.school, 'secure': 'false'});

const Zermelo13   = new ZermeloSchedule(process.env.school, 'fake');

const Zermelo14 = new ZermeloSchedule({'school': process.env.school});
Zermelo14.logOn({
  'password': process.env.password
}, (err) => {
  if (err) {
    console.log(err);
  }
});

Zermelo14.logOn({
  'username': process.env.username
}, (err) => {
  if (err) {
    console.log(err);
  }
});

Zermelo14.logOn({
  'username': process.env.username,
  'password': process.env.password
}, (err) => {
  if (err) {
    console.log(err);
  }

  Zermelo14.logOn({
    'username': process.env.username,
    'password': process.env.password
  }, (err) => {
    if (err) {
      console.log(err);
    }
  });
});
