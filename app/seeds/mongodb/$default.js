'use strict';

const dab = require ('@onehilltech/dab');

// stubbing out the basic user profiles
module.exports = {
  users: dab.times (5, function (i, opts, callback) {
    return callback (null, {
        firstName: 'firsty Namey ' + i,
        lastName: 'lasty Namey' + i,
        email: 'accounty' + i + '@email.com',
        password: 'passwordy' + i,
        gender: 'maleOrFemaleorShemale' + i,
        bio: 'biographies' + i,
        homeAddress: 'homeAddressess' + i,
        geoLocation: "geoLoct" + i,
        birthday: "day of birth" + i,
        numOfDogs: 13 + i
    });
  })
};
