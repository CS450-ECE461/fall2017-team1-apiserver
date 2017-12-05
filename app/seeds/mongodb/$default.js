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

const matchIds = [
    "5a069b13bd9143509882c583",
    "5a069b13bd9143509882c584",
    "5a069b13bd9143509882c582",
    "5a069b13bd9143509882c585",
    "5a069b13bd9143509882c581"
];

const avatarUrls = [
  "https://s3.amazonaws.com/supdog/ProfilePic1.jpeg",
  "https://s3.amazonaws.com/supdog/ProfilePic2.jpeg",
  "https://s3.amazonaws.com/supdog/ProfilePic3.jpeg",
  "https://s3.amazonaws.com/supdog/ProfilePic4.jpeg",
  "https://s3.amazonaws.com/supdog/ProfilePic5.jpeg"
];

const avatarDogUrls = [
  "https://s3.amazonaws.com/supdog/DogPic1.jpg",
  "https://s3.amazonaws.com/supdog/DogPic2.jpg",
  "https://s3.amazonaws.com/supdog/DogPic3.jpg",
  "https://s3.amazonaws.com/supdog/DogPic4.jpg",
  "https://s3.amazonaws.com/supdog/DogPic5.jpg"
];

const firstNames = [
  "Alex,",
  "Avery",
  "Casey",
  "Riley",
  "Tony"
];

const lastNames = [
  "Smith,",
  "Garcia",
  "YoungMoney",
  "Moore",
  "Jones"
];

const locations = [
  "Indianapolis",
  "Avon",
  "Indianapolis",
  "GreenWood",
  "BroaRipple"
]

const bios = [
  "I love dogs, dogs are lyfe.",
  "Hey there, just moved and my dog doesn't have any friends. Hmu",
  "Looking to make new friends :)",
  "Hii, my dog loves playing at the local park, anyone else go there?",
  "My dog needs friends!"
];



const scopes = [
    ["*"],
    [],
    []
];

const dogSizes = ['large', 'small', 'medium', 'small', 'large'];
const status = ['hungry', 'lazy', 'adventurous', 'playful', 'active'];

// stubbing out the basic user profiles
module.exports = {
    users: dab.map (dab.get ('accounts'), function (account, opts, callback) {

      var times = Math.floor(Math.random() * 4) + 1;
      var i = 0;
      return callback(null, {
          _id: account._id,
          matchCriteriaId: userIds[i],
          firstName: firstNames[i],
          lastName: lastNames[i],
          gender: 'male',
          bio: bios[i],
          homeAddress: 'homeAddressess' + account.username,
          geoLocation: locations[i],
          status: status[i],
          birthday: Date.UTC((1990 + times), (0 + 1), times , 0, 0, 0),
          avatar: avatarUrls[i],
          dog: dab.times(times, function(i, opts, callback){
              return callback(null, {
                  firstName: 'Dog',
                  lastName: i,
                  bio: 'dog profile',
                  gender:'male',
                  breed: 'breed' + i,
                  birthday: Date.UTC((2005 + i), (1 + 1), i, 0, 0, 0),
                  size: "large",
                  fixed: "neutered",
                  vetVerification: true,
                  avatar: avatarDogUrls[i],
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
            potentialMatchesQueue: [{"_id":matchIds[i], "liked": true}]
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
