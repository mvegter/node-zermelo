# Zermelo Library for Node.JS

### Disclaimer: this project is created by a third party and not associated with Zermelo Software BV.

[![npm](https://img.shields.io/npm/v/zermelo.svg?style=flat-square)](https://www.npmjs.com/package/zermelo)
[![npm](https://img.shields.io/npm/l/zermelo.svg?style=flat-square)](https://github.com/mvegter/node-zermelo/blob/master/LICENSE)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/cc95bbd165834373ab34938416d03c33?style=flat-square)](https://www.codacy.com/app/mvegter/node-zermelo?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mvegter/node-zermelo&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/mvegter/node-zermelo.svg?branch=master&style=flat-square)](https://travis-ci.org/mvegter/node-zermelo)
[![Coverage Status](https://coveralls.io/repos/github/mvegter/node-zermelo/badge.svg?branch=master)](https://coveralls.io/github/mvegter/node-zermelo?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/mvegter/node-zermelo/badge.svg?style=flat-square)](https://snyk.io/test/github/mvegter/node-zermelo)
[![GitHub issues](https://img.shields.io/github/issues/mvegter/node-zermelo.svg?style=flat-square)](https://github.com/mvegter/node-zermelo/issues)

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
