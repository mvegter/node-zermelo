const ZermeloSchedule = require('../lib/index.js'); // use require('zermelo') in production
const Zermelo 				= new ZermeloSchedule();

Zermelo.logOn({
	'school' 		: '', 
  'username' 	: '',
  'password' 	: ''
}, (err) => {
  if(err) {
    console.log(err);
    return;
  }

});