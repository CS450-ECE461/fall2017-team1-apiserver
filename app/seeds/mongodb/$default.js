'use strict';

const dab = require ('@onehilltech/dab');

// stubbing out the basic user profiles
module.exports = {



  users: dab.times (5, function (i, opts, callback) {

      var times = Math.floor(Math.random() * 4) + 1;

      return callback(null, {
          firstName: 'firsty Namey ' + i,
          lastName: 'lasty Namey' + i,
          email: 'account' + i + '@email.com',
          password: 'password' + i,
          gender: 'maleOrFemaleorShemale' + i,
          bio: 'biographies' + i,
          homeAddress: 'homeAddressess' + i,
          geoLocation: "geoLoct" + i,
          status: 'status' + i,
          birthday: Date.UTC((1990 + i), (0 + 1), i, 0, 0, 0),
          dog: dab.times(times, function(i, opts, callback){
              return callback(null, {
                  firstName: 'first dogo name' + i,
                  lastName: 'lasty dogo name' + i,
                  bio: 'im heckin cool',
                  gender:'maleOrFemaleorShemale',
                  breed: 'breed' + i,
                  birthday: Date.UTC((2005 + i), (1 + 1), i, 0, 0, 0),
                  size:"large",
                  fixed:"neutered/spayed",
                  vetVerification:["verification"]
              });
          })

      });
  }),


    MatchCriterias: dab.times (5, function (i, opts, callback) {
        return callback(null, {
            minAgeOfDog: i,
            maxAgeOfDog: 2 + i,
            dogSizeC: i + 'feet',
            vetVerificationC: false,
            statusC: i + ' single : (' ,
            locationC: i + i

        });
    })
};
