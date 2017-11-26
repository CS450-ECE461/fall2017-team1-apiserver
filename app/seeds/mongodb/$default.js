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


    // let user 2 be friends with user 0 and 1
    friend: dab.times(2, function(i, opts, callback){
        var friend = {
            user1: dab.ref ('users.2'),
            user2: dab.ref (`users.${i}`)
        };

        return callback (null, friend);
    }),

    // conversation between user0 and user1
    message: [
        {to: dab.ref('users.0'), from: dab.ref('users.1'), message:'hello', timeStamp:Date.UTC(2017, 11, 27, 11, 34)},
        {to: dab.ref('users.1'), from: dab.ref('users.0'), message:'why hello', timeStamp:Date.UTC(2017, 11, 27, 11, 45)},
        {to: dab.ref('users.0'), from: dab.ref('users.1'), message:'Lovely weather isnt it?', timeStamp:Date.UTC(2017, 11, 27, 12, 4)},
        {to: dab.ref('users.1'), from: dab.ref('users.0'), message:'I suppose', timeStamp:Date.UTC(2017, 11, 28, 6, 13)}
    ],
    
    // single web access client
    clients: dab.times (1, function (i, opts, callback) {
        var clientName = 'supdog-web';
        var client = {
            _id: env.environment.client_id,
            name: clientName,
            secret: env.environment.client_id,
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
