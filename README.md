# Zermelo Library for Node.JS

### Disclaimer: this project is created by a third party and not associated with Zermelo Software BV.

[![npm](https://img.shields.io/npm/v/zermelo.svg?style=flat-square)](https://www.npmjs.com/package/zermelo)
[![npm](https://img.shields.io/npm/l/zermelo.svg?style=flat-square)](https://github.com/mvegter/node-zermelo/blob/master/LICENSE)
[![Travis branch](https://img.shields.io/travis/mvegter/node-zermelo/master.svg?style=flat-square)](https://travis-ci.org/mvegter/node-zermelo)
[![Known Vulnerabilities](https://snyk.io/test/github/mvegter/node-zermelo/badge.svg?style=flat-square)](https://snyk.io/test/github/mvegter/node-zermelo)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

# Contents
- [Installation](#installation-)
- [Usage](#usage-)
- [Methods](#methods-)
- [Events](#events-)

## Installation [^](#contents)
```
  npm install zermelo
```

## Usage [^](#contents)

```javascript
const ZermeloSchedule = require('zermelo');
const Zermelo         = new ZermeloSchedule();

Zermelo.logOn({
  'school'    : '', 
  'username'  : '',
  'password'  : ''
});

  or

Zermelo.logOn({
  'school'    : '', 
  'authCode'  : ''
});
```

## Methods [^](#contents)
### logOn
- `school` - (required) 
- `username` - (optional)
- `password` - (optional)
- `authCode` - (optional)

Note: Either a Authorization Code or Username / Password combination is required

### getAnnouncements
- `boolean` - Only retrieve the announcements that should be shown to users (Suggested: true)
- `callback` - CAlled when succesfully received announcements or an error occurs
  - `err` - An `Error` object on failure, or `null` on success
  - `res` - An JSON object containing any announcements

### getSchedule
- `start` - UTC Unix time of the start of this appointment. This is the first second this appointment is taking place.
- `end` - UTC Unix time of the end of this appointment. This is the first second where this appointment is no longer taking place.
- `callback` - CAlled when succesfully received announcements or an error occurs
  - `err` - An `Error` object on failure, or `null` on success
  - `res` - An JSON object
    - `status` - If there was no error, than this should be 200
    - `message` - Unknown field
    - `details` - Unknown field
    - `eventId` - Unknown field
    - `startRow` - Should always be 0
    - `endRow` - Total length of data object
    - `data` - A JSON object containing any appointments
  
## Events [^](#contents)
### loggedOn
Emitted when you're successfully logged into Zermelo.

### error
- `err` - An `Error` object

Emitted when an error occurs during logon. If this event isn't handled, the program will crash.
