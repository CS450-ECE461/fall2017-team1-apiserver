'use strict';

const dab = require ('@onehilltech/dab'),
    gatekeeper = require('@onehilltech/blueprint-gatekeeper'),
    mongodb = require ('@onehilltech/blueprint-mongodb'),
    ObjectId = mongodb.Types.ObjectId;

var i = 0;

const scopes = [
    [gatekeeper.scope.account.create],
    [],
    []
];

const LOGIN_CLIENTS = {
    tester0: 0,
    tester1: 0,
    tester2: 1,
    tester3: 2,
    tester4: 2
};



// stubbing out the basic user profiles
module.exports = {

    users: dab.map (dab.get ('accounts'), function (account, opts, callback) {

      var times = Math.floor(Math.random() * 4) + 1;

       // account.
      return callback(null, {
          accountId: account._id,
          firstName: 'firsty Namey',
          lastName: account.username,
          email: account.username+ '@email.com',
          password: account.username,
          gender: 'maleOrFemaleorShemale',
          bio: 'biographies' + account.username,
          homeAddress: 'homeAddressess' + account.username,
          geoLocation: "geoLoct" + account.username,
          status: 'status' + account.username,
          birthday: Date.UTC((1990 + times), (0 + 1), times, 0, 0, 0),
          dog: dab.times(times, function(i, opts, callback){
              return callback(null, {
                  firstName: 'first ' + account.username,
                  lastName: 'lasty dogo name',
                  bio: 'im heckin cool',
                  gender:'maleOrFemaleorShemale',
                  breed: 'breed' + i,
                  birthday: Date.UTC((2005 + times), (1 + 1), times, 0, 0, 0),
                  size:"large",
                  fixed:"neutered/spayed",
                  vetVerification:["verification"]
              });
          })

      });
      i++;
  }),

    clients: dab.times (3, function (i, opts, callback) {
        var clientName = 'client' + i;
        var client = {name: clientName, secret: clientName, email: clientName + '@no-reply.com', scope: scopes[i]};

        return callback (null, client);
    }),

    accounts: dab.times (5, function (i, opts, callback) {
        var username = 'tester' + i;
        var account = {
            created_by: dab.ref ('clients.0'),
            username: username,
            password: username,
            email: username + '@no-reply.com'
        };

        return callback (null, account);
    }),

    user_tokens: dab.map (dab.get ('accounts'), function (account, opts, callback) {
        const clientIndex = LOGIN_CLIENTS[account.username];

        var model = {
            client: dab.get ('clients.' + clientIndex),
            account: account._id,
            refresh_token: new ObjectId(),
            scope: scopes[clientIndex]
        };

        return callback (null, model);
    }),

    client_tokens: dab.map (dab.get ('clients'), function (client, opts, callback) {
        return callback (null, {client: client._id});
    }),



};
