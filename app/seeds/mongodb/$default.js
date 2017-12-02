'use strict';

const dab = require ('@onehilltech/dab'),
    gatekeeper = require('@onehilltech/blueprint-gatekeeper'),
    mongodb = require ('@onehilltech/blueprint-mongodb'),
    env = require('../../configs/environment.config'),
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

const dogSizes = ['large', 'small', 'medium', 'small', 'large'];
const status = ['adventurous', 'adventurous', 'adventurous', 'adventurous', 'adventurous'];


// stubbing out the basic user profiles
module.exports = {

    users: dab.map (dab.get ('accounts'), function (account, opts, callback) {

      var times = Math.floor(Math.random() * 4) + 1;
      var i = 0;
      return callback(null, {
          _id: account._id,
          firstName: 'firsty Namey ',
          lastName: account.username,
          gender: 'maleOrFemaleorShemale',
          bio: 'biographies' + account.username,
          homeAddress: 'homeAddressess' + account.username,
          geoLocation: "geoLoct" + account.username,
          status: status[i],
          birthday: Date.UTC((1990 + times), (0 + 1), times , 0, 0, 0),
          dog: dab.times(times, function(i, opts, callback){
              return callback(null, {
                  firstName: 'first dogo name' + i,
                  lastName: 'lasty dogo name' + i,
                  bio: 'im heckin cool',
                  gender:'maleOrFemaleorShemale',
                  breed: 'breed' + i,
                  birthday: Date.UTC((2012 + i), (1 + 1), i, 0, 0, 0),
                  size: dogSizes[i],
                  fixed:"neutered/spayed",
                  vetVerification: false
              });
          })

      });

  }),


    MatchCriterias: dab.times (5, function (i, opts, callback) {
        return callback(null, {
            _id: dab.ref(`users.${i}`),
            minAgeOfDog: i,
            maxAgeOfDog: 5 + i,
            dogSizeC: dogSizes[i],
            vetVerificationC: false,
            status: status[i] ,
            locationC: i + i,
            lastInsertedId: 0,
            potentialMatchesQueue: [{"_id":userIds[i]}]
        });
    }),


    // let user 2 be friends with user 0 and 1
    friend: dab.times(2, function(i, opts, callback){
        var friend = {
            user1: dab.ref ('users.2'),
            user2: dab.ref (`users.${i}`)
        };

        return callback (null, friend);
    }),


    // single web access client
    clients: dab.times (1, function (i, opts, callback) {
        var clientName = 'supdog-web';
        var client = {
            _id: env.environment.client_id,
            name: clientName,
            secret: env.environment.client_secret,
            email: clientName + '@no-reply.com',
            scope: scopes[i]
        };

        return callback (null, client);
    }),

    // account for each of out users
    accounts: dab.times (5, function (i, opts, callback) {
        var username = 'tester' + i;
        var account = {
            _id:userIds[i],
            created_by: dab.ref ('clients.0'),
            username: username,
            password: username,
            email: username + '@no-reply.com'
        };

        return callback (null, account);
    })
};
