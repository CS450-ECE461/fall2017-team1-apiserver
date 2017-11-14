var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    MatchCriteria = require('../models/MatchCriteria'),
    util = require ('util');



function MatchController () {
    blueprint.ResourceController.call (this, {name: 'MatchCriteria', model: MatchCriteria});
}

blueprint.controller (MatchController, blueprint.ResourceController);



MatchController.prototype.updateCriteria = function(){
    return function(req, res){
        //nothing for now.
    }
}


module.exports = exports = MatchController;