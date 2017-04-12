const ZermeloSchedule = require('../lib/index.js');
const Zermelo1 = new ZermeloSchedule();

Zermelo1.logOn({
  'school': process.env.school,
  'username': process.env.username,
  'password': process.env.password
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Logged in!');

  Zermelo1.logOn({
    'school': process.env.school,
    'username': process.env.username,
    'password': process.env.password
  }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Logged in!');
  });
});

const Zermelo2 = new ZermeloSchedule();

Zermelo2.logOn({
  'username': process.env.username,
  'password': process.env.password
}, (err) => {
  if (err) {
    console.error(err);
  }
});

Zermelo2.logOn({
  'school': process.env.school,
  'password': process.env.password
}, (err) => {
  if (err) {
    console.error(err);
  }
});

Zermelo2.logOn({
  'school': process.env.school,
  'username': process.env.username
}, (err) => {
  if (err) {
    console.error(err);
  }
});

const Zermelo3 = new ZermeloSchedule();
Zermelo3.logOn({
  'school': process.env.school,
  'username': process.env.username,
  'password': process.env.password
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Logged in!');

  var curr = new Date();
  var monday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  var friday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

  monday = Math.round(monday.getTime() / 1000);
  friday = Math.round(friday.getTime() / 1000);

  Zermelo3.getSchedule(monday, friday, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log('Got schedule!');
  });

  Zermelo3.getSchedule('asdf', friday, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log('Got schedule!');
  });

  Zermelo3.getSchedule(monday, 'asdf', (err, res) => {
    if (err) {
      console.log(err);
    }
    console.log('Got schedule!');
  });
});

const Zermelo4 = new ZermeloSchedule();
Zermelo4.logOn({
  'school': process.env.school,
  'username': process.env.username,
  'password': process.env.password,
  'secure': false
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Logged in!');
});

Zermelo4.logOn({
  'school': process.env.school,
  'username': process.env.username,
  'password': process.env.password,
  'secure': true
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Logged in!');
});

const Zermelo5 = new ZermeloSchedule();
Zermelo5.logOn({
  'school': process.env.school,
  'authCode': '123 456 789'
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Logged in!');
});

Zermelo5.logOn({
  'school': process.env.school,
  'authCode': '123 456 789',
  'secure': false
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Logged in!');
});

const Zermelo6 = new ZermeloSchedule();
Zermelo6.logOn({
  'school': process.env.school,
  'username': process.env.username,
  'password': process.env.password
}, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Logged in!');

  Zermelo6.getAnnouncements('true', function (err, res) {
    if (err) {
      return console.error(err);
    }
    console.log(res.status);
  });

  Zermelo6.getAnnouncements('false', function (err, res) {
    if (err) {
      return console.error(err);
    }
    console.log(res.status);
  });

  Zermelo6.getAnnouncements('tru', function (err, res) {
    if (err) {
      return console.error(err);
    }
    console.log(res.status);
  });

  Zermelo6.getAnnouncements('fals', function (err, res) {
    if (err) {
      return console.error(err);
    }
    console.log(res.status);
  });
});
