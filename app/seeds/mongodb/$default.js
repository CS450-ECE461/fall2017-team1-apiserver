'use strict';

const dab = require ('@onehilltech/dab'),
    gatekeeper = require('@onehilltech/blueprint-gatekeeper'),
    mongodb = require ('@onehilltech/blueprint-mongodb'),
    ObjectId = mongodb.Types.ObjectId;


const userIds = [
    "5a069b13bd9143509882c581",
    "5a069b13bd9143509882c583",
    "5a069b13bd9143509882c584",
    "5a069b13bd9143509882c582",
    "5a069b13bd9143509882c585"
];

const scopes = [
    ["*"],
    [],
    []
];





// stubbing out the basic user profiles
module.exports = {

    users: dab.map (dab.get ('accounts'), function (account, opts, callback) {

      var times = Math.floor(Math.random() * 4) + 1;
      var i = 0;
      return callback(null, {
          _id: userIds[account.number],
          accountId: account._id,
          firstName: 'firsty Namey ',
          lastName: account.username,
          email: account.username+ '@email.com',
          password: account.username,
          gender: 'maleOrFemaleorShemale',
          bio: 'biographies' + account.username,
          homeAddress: 'homeAddressess' + account.username,
          geoLocation: "geoLoct" + account.username,
          status: 'status' + account.username,
          birthday: Date.UTC((1990 + times), (0 + 1), times , 0, 0, 0),
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

    // single web access client
    clients: dab.times (1, function (i, opts, callback) {
        var clientName = 'supdog-web';
        var client = {
            _id: process.env.CLIENT_ID,
            name: clientName,
            secret: process.env.CLIENT_SECRET,
            email: clientName + '@no-reply.com',
            scope: scopes[i]
        };

        return callback (null, client);
    }),

    // account for each of out users
    accounts: dab.times (5, function (i, opts, callback) {
        var username = 'tester' + i;
        var account = {
            created_by: dab.ref ('clients.0'),
            username: username,
            password: username,
            email: username + '@no-reply.com',
            number: i
        };

        return callback (null, account);
    }),



};
