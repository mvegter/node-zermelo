const ZermeloSchedule = require('../lib/index.js'); // use require('zermelo') in production
const Zermelo         = new ZermeloSchedule();

Zermelo.logOn({
  'school'    : '', 
  'username'  : '',
  'password'  : ''
}, (err) => {
  if(err) {
    console.log(err);
    return;
  }
  console.log('Succesfully logged into Zermelo');

  var curr = new Date;
  var monday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
  var friday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));

  monday = Math.round(monday.getTime() / 1000);
  friday = Math.round(friday.getTime() / 1000);

  Zermelo.getSchedule(monday, friday, function(err, res) {
    if(err) {
      console.error(err);
      return;
    }

    var lesssons = res.data;
    var prev = '';
    for (var i = 0; i < lesssons.length; i++) {
      var day = new Date(lesssons[i].start * 1000).toLocaleDateString();
      if(prev != day) {
        prev = day;
        console.log();
      }

      var start = new Date(lesssons[i].start * 1000).toLocaleTimeString();
      var end = new Date(lesssons[i].end * 1000).toLocaleTimeString();
      console.log(start + ' - ' + end + ' || ' + lesssons[i].subjects[0]);
    };
  });
});
