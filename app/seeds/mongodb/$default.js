'use strict';

const dab = require ('@onehilltech/dab');

// stubbing out the basic user profiles
module.exports = {
  users: dab.times (5, function (i, opts, callback) {
    return callback (null, {
        firstName: 'fname ' + i,
        lastName: 'lname' + i,
        email: 'account' + i + '@email.com',
        password: 'account' + i
    });
  })
};
