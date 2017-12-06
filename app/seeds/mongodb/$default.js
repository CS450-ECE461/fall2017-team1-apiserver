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
    "5a069b13bd9143509882c585",

    "5a069b13bd9143509882c586",
    "5a069b13bd9143509882c587",
    "5a069b13bd9143509882c588",
    "5a069b13bd9143509882c589",
    "5a069b13bd9143509882c590",

    "5a069b13bd9143509882c591",
    "5a069b13bd9143509882c592",
    "5a069b13bd9143509882c593",
    "5a069b13bd9143509882c594",
    "5a069b13bd9143509882c595"
];

const matchIds = [
    "5a069b13bd9143509882c583",
    "5a069b13bd9143509882c584",
    "5a069b13bd9143509882c582",
    "5a069b13bd9143509882c585",
    "5a069b13bd9143509882c581"
];

const avatarUrls = [
  "https://s3.amazonaws.com/supdog/evan.png",
  "https://s3.amazonaws.com/supdog/olivia.png",
  "https://s3.amazonaws.com/supdog/Kim.png",

  "https://s3.amazonaws.com/supdog/ProfilePic1.jpg",
  "https://s3.amazonaws.com/supdog/ProfilePic2.jpg",
  "https://s3.amazonaws.com/supdog/ProfilePic3.jpg",
  "https://s3.amazonaws.com/supdog/ProfilePic4.jpg",
  "https://s3.amazonaws.com/supdog/ProfilePic5.jpg",

  "https://s3.amazonaws.com/supdog/ProfilePic6.jpg",
  "https://s3.amazonaws.com/supdog/ProfilePic7.jpg",
  "https://s3.amazonaws.com/supdog/ProfilePic8.jpg",
  "https://s3.amazonaws.com/supdog/ProfilePic9.jpg",
  "https://s3.amazonaws.com/supdog/ProfilePic10.jpg",

  "https://s3.amazonaws.com/supdog/ProfilePic11.jpg",
  "https://s3.amazonaws.com/supdog/ProfilePic12.jpg"
];

const avatarDogUrls = [
  "https://s3.amazonaws.com/supdog/Oliver.jpg",
  "https://s3.amazonaws.com/supdog/Max.jpg",
  "https://s3.amazonaws.com/supdog/Bella.jpg",

  "https://s3.amazonaws.com/supdog/DogPic1.jpg",
  "https://s3.amazonaws.com/supdog/DogPic2.jpg",
  "https://s3.amazonaws.com/supdog/DogPic3.jpg",
  "https://s3.amazonaws.com/supdog/DogPic4.jpg",
  "https://s3.amazonaws.com/supdog/DogPic5.jpg",

  "https://s3.amazonaws.com/supdog/DogPic6.jpg",
  "https://s3.amazonaws.com/supdog/DogPic7.jpg",
  "https://s3.amazonaws.com/supdog/DogPic8.jpg",
  "https://s3.amazonaws.com/supdog/DogPic9.jpg",
  "https://s3.amazonaws.com/supdog/DogPic10.jpg",

  "https://s3.amazonaws.com/supdog/DogPic11.jpg",
  "https://s3.amazonaws.com/supdog/DogPic12.jpg"

];

//Unisex names
const firstNames = [
  "Evan",
  "Olivia",
  "Casey",
  "Riley",
  "Tony",

  "Micah",
  "Taylor",
  "Carson",
  "Cameron",
  "Jordan",

  "Jamie",
  "Lee",
  "Jodi",
  "Kelly",
  "Beverly"
];

const lastNames = [
  "Smith",
  "Garcia",
  "YoungMoney",
  "Moore",
  "Jones",

  "Johnson",
  "Brown",
  "Wilson",
  "Davis",
  "Williams",

  "Evans",
  "Lopez",
  "McDonald",
  "Richards",
  "Walker"
];

const locations = [
  "Indianapolis, IN",
  "Avon, IN",
  "Indianapolis, IN",
  "GreenWood, IN",
  "BroadRipple, IN",

  "Plainfield, IN",
  "FortWayne, IN",
  "Fishers, IN",
  "Bloomington, IN",
  "Indianapolis, IN",

  "GreenWood, IN",
  "BroadRipple, IN",
  "Plainfield, IN",
  "FortWayne, IN",
  "Fishers, IN"
];

const bios = [
  "Me and Oliver love to go on long adventurous hikes and try new trails. we're looking to find someone as adventurous as us",
  "Hey there, just moved and my dog Mac doesn't have any friends. We need walking buddies",
  "Just got a new pup,Bella and we\'re looking to make new friends :)",
  "Hii, my dog loves playing at the local park, anyone else go there?",
  "My dog needs friends!",

  "I a have a dog.",
  "What old is your dog? I only like young cute dogs.",
  "Did you know that the dog in Fallout 3, was named DogMeat.",
  "I waxed my dog eyebro's now she can see better.",
  "My dog treats brings all the dogs to the yard, they are like WOOF! ",

  "OMG I love this app <3 ",
  "Gosh I like how app looks, its so addicting",
  "My doggo loves to play with other dogs. I just hope your dog is vet-verified.",
  "Hey everyone, new to the area. Looking to make friends with dogs.",
  "Darsey only plays with dogs that look at memes.",
  "What's up dog "
];

const homeAddresses = [
  "P.O. Box 929 4189 Nunc Road, Lebanon, KY 69409",
  "5587 Nunc. Avenue, Erie, RE 24975",
  "Ap #696-3279 Viverra. Avenue, Latrobe, DE 38100",
  "P.O. Box 132 1599 Curabitur Rd. Bandera South Dakota 45149",
  "347-7666 Iaculis St., Woodruff SC 49854",

  "666-4366 Lacinia Avenue, Idaho Falls Ohio 19253",
  "P.O. Box 147 2546 Sociosqu Rd., Bethlehem Utah 02913",
  "557-6308 Lacinia Road, San Bernardino ND 09289",
  "Ap #285-7193 Ullamcorper Avenue, Amesbury HI 93373",
  "5543 Aliquet St., Fort Dodge GA 20783",

  "6351 Fringilla Avenue, Gardena Colorado 37547",
  "935-1670 Neque. St., Centennial Delaware 48432",
  "414-7533 Non Rd., Miami Beach North Dakota 58563",
  "778-9383 Suspendisse Av., Weirton IN 93479",
  "P.O. Box 360 4407 Et Rd, Santa Monica FL 30309"
];


const scopes = [
    ["*"],
    [],
    []
];

const dogFirstNames = [
    'Oliver', 'Max', 'Bella', 'Bronx', 'Doone', 'Java', 'Moroccan',
    'Saint', 'Zolten', 'Nate', 'Josiah', 'Tim', 'Turk', 'Trevor', 'Pardeep'];

const dogLevels = ['high', 'medium', 'average', 'low', 'average'];
const dogSizes = ['large', 'small', 'medium', 'small', 'large'];
const status = ['hungry', 'lazy', 'adventurous', 'playful', 'active'];
const gender = ['male', 'female', 'male', 'female', 'female' ];
const breed = ['golden retriever', 'Black Lab', 'Pug', 'German shepherd', 'Corgi'];
const dogBio = [
    'Be the best boy you can be, then maybe youll get petted',
    'SQUIRREL!', 'come sniff my butt ;)',
    'my friend made this lol, wont message first. Follow me on insta @ballboi',
    'Lover of walks, hate vacuums and the mail man. If you like mud, we\'ll get along just fine' ];




var index = -1;
// stubbing out the basic user profiles
module.exports = {


    users: dab.map (dab.get ('accounts'), function (account, opts, callback) {
        index++;
        if(index > 14){index = 0;}
        const MAX = 5;
        const MIN = 0;
        var i = Math.floor(Math.random() * (MAX - MIN) + MIN);
        var times = Math.floor(Math.random() * 4) + 1;
        return callback(null, {
            _id: account._id,
            //matchCriteriaId: userIds[i],
            firstName: firstNames[index],
            lastName: lastNames[index],
            gender: gender[i],
            bio: bios[index],
            homeAddress: homeAddresses[index],
            geoLocation: locations[index],
            status: status[index],
            birthday: Date.UTC((1990 + times), (0 + 1), times , 0, 0, 0),
            avatar: avatarUrls[index],
            dog: [{
                    firstName: dogFirstNames[index],
                    lastName: lastNames[index],
                    bio: dogBio[index],
                    gender: gender[i],
                    breed: breed[i],
                    birthday: Date.UTC((2005 + i), (1 + 1), i, 0, 0, 0),
                    size: dogSizes[i],
                    playfulness: dogLevels[i],
                    energy: dogLevels[i],
                    fixed: "neutered",
                    vetVerification: true,
                    avatar: avatarDogUrls[index]
                }]

        });

    }),

    MatchCriterias: dab.times (15, function (i, opts, callback) {
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
            user1: dab.ref ('users.0'),
            user2: dab.ref (`users.${i + 1}`)
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
    accounts: dab.times (15, function (i, opts, callback) {
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
