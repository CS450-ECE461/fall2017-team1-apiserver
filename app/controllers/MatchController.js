var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    MatchCriteria = require('../models/MatchCriteria'),
    util = require ('util');



function MatchController () {
    blueprint.ResourceController.call (this, {name: 'MatchCriteria', model: MatchCriteria});
}

blueprint.controller (MatchController, blueprint.ResourceController);





MatchController.prototype.updateStatus = function(){
    return function(req, res){
        // update user and return updated model
        User.findByIdAndUpdate({_id: req.params.id}, {statusC: req.body.status}, {new: true}, function(err, user){
            if(err){ return res.sendStatus(500); }
            if(user == null) {return res.sendStatus(404);}

            return res.sendStatus(204);
        });

    }
};


module.exports = exports = MatchController;