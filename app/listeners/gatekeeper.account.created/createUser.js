// event listener that sends out an activation email to the user
const blueprint = require ('@onehilltech/blueprint'),
    messaging = blueprint.messaging;
    gatekeeper = require('@onehilltech/blueprint-gatekeeper'),
        User = require('../../models/User'),
        MatchCriteria = require('../../models/MatchCriteria');


module.exports = function(account){

    var newMatchCriteria = new MatchCriteria({
        minAgeOfDog: 1,
        maxAgeOfDog: 10,
        dogSizeC: 'medium',
        vetVerificationC: false,
        statusC: 'happy',
        locationC: 'Indianapolis'
    });

    newMatchCriteria.save(function(err, newMatchCriteria) {
        if (err) {
            return callback(new HttpError (500, 'Failed to save matchCriteria'));
        }else{
            console.log("a criteria was created");
            console.log(newMatchCriteria.id);
        }
    });

    // create a new user from the account creation
    var newUser = new User({
        _id:account._id,
        matchCriteriaId: newMatchCriteria.id,
        firstName: 'temp',
        lastName: 'temp'
    });

    newUser.save(function(err){
        if(err){
            console.log(err)
        } else {
            console.log("a user was created");
        }
    });
}
