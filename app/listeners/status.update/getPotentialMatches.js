const blueprint = require ('@onehilltech/blueprint'),
    User = require('../../models/User'),
    MatchCriteria = require('../../models/MatchCriteria');


// Everytime a user updates their status, search db for potential matches and
// add them to the users potentialMatchesQueue
module.exports = function(matchCriteria){
 console.log(matchCriteria);
}
