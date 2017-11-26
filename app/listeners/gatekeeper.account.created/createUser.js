// event listener that sends out an activation email to the user
const blueprint = require ('@onehilltech/blueprint'),
    messaging = blueprint.messaging;
    gatekeeper = require('@onehilltech/blueprint-gatekeeper'),
        User = require('../../models/User');


module.exports = function(account){

    // create a new user from the account creation
    var newUser = new User({
        _id:account._id,
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
