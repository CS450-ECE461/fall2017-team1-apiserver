const blueprint = require ('@onehilltech/blueprint'),
    User = require('../../models/User');


// Everytime a user updates their status, search db for potential matches and
// add them to the users potentialMatchesQueue
module.exports = function(matchCriteria){
 //console.log(matchCriteria);
 //console.log(matchCriteria.dogSizeC);
 User.find({$and:[
     {'dog.size': matchCriteria.dogSizeC},
     {'dog.vetVerification': matchCriteria.vetVerificationC},
     {'dog.status': matchCriteria.status}

 ]},function(err, people){
     //console.log('potential matches: \n' + people);

     people.forEach(function(element){
         console.log('potential match: ' + element._id);
     });

     // minAgeOfDog: 1,
     //     maxAgeOfDog: 3,


     //     locationC: '2',

  console.log('end search');
 });

// {$and:[
    // {'dog.verified': matchCriteria.vetVerificationC},
    // {'dog.size':matchCriteria.dogSizeC}
    // ]},

}
