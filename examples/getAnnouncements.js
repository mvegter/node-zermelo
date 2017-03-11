const ZermeloSchedule = require('../lib/index.js'); // use require('zermelo') in production
const Zermelo         = new ZermeloSchedule();

Zermelo.logOn({
  'school'    : '', 
  'username'  : '',
  'password'  : ''
});

Zermelo.on('loggedOn', function() {
  console.log('Succesfully logged into Zermelo');

  Zermelo.getAnnouncements('true', function(err, res) {
    if(err) {
      console.error(err);
      return;
    }

    var announcements = res.data;

    for (var i = announcements.length - 1; i >= 0; i--) {
      console.log('Announcement: ' + announcements[i].text);
      console.log();
    };
  });
});
