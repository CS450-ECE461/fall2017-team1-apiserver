var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    User = require('../models/User'),
    MatchCriteria = require('../models/MatchCriteria'),
    util = require ('util');



function MatchController () {
    blueprint.ResourceController.call (this, {name: 'MatchCriteria', model: MatchCriteria});
}

blueprint.controller (MatchController, blueprint.ResourceController);




MatchController.prototype.updateCriteria = function(){

    return function(req, res){
        User.findById(req.params.id, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null) { return res.sendStatus(404); }
            var criteriaID = person.getMatchCriteriaID();

            // update criteria and return updated model
            MatchCriteria.findByIdAndUpdate({_id: criteriaID}, {minAgeOfDog: req.body.minAgeOfDog, maxAgeOfDog: req.body.maxAgeOfDog,
                dogSizeC: req.body.dogSize, vetVerificationC: req.body.vetVerification, statusC: req.body.status}, {new: true}, function(err, criteria){
                    if(err){ return res.sendStatus(500); }
                    if(criteria == null) {return res.sendStatus(404);}
                    return res.status(200).json(criteria);
                });
        });
    }
};


module.exports = exports = MatchController;
/*

MatchController.prototype.updateCriteria = function(){
    console.log('made it here------------------------------ 1');
    return function(req, res){
        console.log('made it here------------------------------ 2');
        var criteriaID = '0';
        User.findById(req.params.id, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null) { return res.sendStatus(404); }
            criteriaID = person.getMatchCriteriaID();
            // update criteria and return updated model
            MatchCriteria.findByIdAndUpdate({_id: criteriaID}, {minAgeOfDog: req.body.minAgeOfDog}, {maxAgeOfDog: req.body.maxAgeOfDog},
                {dogSizeC: req.body.dogSize}, {vetVerificationC: req.body.vetVerification}, {statusC: req.body.status}, {new: true}, function(err, criteria){
                    if(err){ return res.sendStatus(500); }
                    if(criteria == null) {return res.sendStatus(404);}
                    return res.status(200).json(criteria);
                });

        });


    }
};*/
