'use strict';

const dab = require ('@onehilltech/dab');

// stubbing out the basic user profiles
module.exports = {
  users: dab.times (5, function (i, opts, callback) {
    return callback (null, {
        uniqueId: 11 + i,
        firstName: 'fname ' + i,
        lastName: 'lname' + i,
        email: 'account' + i + '@email.com',
        password: 'account' + i,
        gender: 'maleOrFemale' + i,
        bio: 'biography' + i,
        homeAddress: 'homeAdd' + i,
        geoLocation: "geoLoc" + i,
        birthday: "bday" + i,
        numOfDogs: 12 + i
    });
  })
};
