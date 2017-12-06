const blueprint = require ('@onehilltech/blueprint'),
    User = require('../../models/User'),
    MatchCriteria  = require('../../models/MatchCriteria') ;

// Everytime a user updates their status, search db for potential matches and
// add them to the users potentialMatchesQueue
module.exports = function(matchCriteria){
    var currentDate = new Date();

 User.find({$and:[
   // {'dog.size': matchCriteria.dogSizeC},
    //{'dog.vetVerification': matchCriteria.vetVerificationC},
    {status: matchCriteria.status},
    //{'dog.birthday': { $gte: new Date((currentDate.getFullYear() - matchCriteria.maxAgeOfDog), 1)}},
    //{'dog.birthday': { $lte: new Date((currentDate.getFullYear() - matchCriteria.minAgeOfDog), 1)}}
 ]},function(err, people){

    // add the potential matches into the potential match queue
     people.forEach(function(element){
        // console.log(element);
        if(matchCriteria.potentialMatchesQueue.includes({'_id':element._id, 'liked': 'false'}) == false){
            if(matchCriteria.potentialMatchesQueue.includes({'_id':element._id, 'liked': 'true'}) == false){
                matchCriteria.lowPriorityInsertId(element._id);
            }
        }
        
     });
     //console.log(matchCriteria);
     matchCriteria.save();
 });

}
