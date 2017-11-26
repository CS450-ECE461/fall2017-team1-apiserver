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
                dogSizeC: req.body.dogSizeC, vetVerificationC: req.body.vetVerificationC, statusC: req.body.statusC, locationC: req.body.locationC}, {new: true}, function(err, criteria){
                    if(err){ return res.sendStatus(500); }
                    if(criteria == null) {return res.sendStatus(404);}
                    criteria.save();
                    return res.status(200);
                });
        });
    }
};

MatchController.prototype.getCriteria = function(){

    return function(req, res){
        User.findById(req.params.id, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null) { return res.sendStatus(404); }
            var criteriaID = person.getMatchCriteriaID();

            MatchCriteria.findById({_id: criteriaID}, function(err, criteria){
                if(err){ return res.sendStatus(500); }
                if(criteria == null) {return res.sendStatus(404);}
                return res.status(200).json(criteria);
            });
        });
    }
};

MatchController.prototype.updateStatus = function(){

    return function(req, res){
        User.findById(req.params.id, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null) { return res.sendStatus(404); }
            var criteriaID = person.getMatchCriteriaID();

            // update status and return updated model
            MatchCriteria.findByIdAndUpdate({_id: criteriaID}, {statusC: req.body.statusC}, {new: true}, function(err, criteria){
                if(err){ return res.sendStatus(500); }
                if(criteria == null) {return res.sendStatus(404);}
                criteria.save();
                return res.status(200);
            });
        });
    }
};


//here functions that operate on the queue can be run
MatchController.prototype.findMatch = function(){
    return function(req, res){
        User.findById(req.params.id, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null) { return res.sendStatus(404); }
            var criteriaID = person.getMatchCriteriaID();

            MatchCriteria.findById(criteriaID, function(err, criteria){
                if(err){ return res.sendStatus(500); }
                if(criteria == null) {return res.sendStatus(404);}
                criteria.lowPriorityInsertId("000000000000000000000001");
                criteria.lowPriorityInsertId("000000000000000000000002");
                criteria.lowPriorityInsertId("000000000000000000000003");
                criteria.highPriorityInsertId("000000000000000000000003");
                criteria.save();
                return res.status(200).json(criteria);
            });
        });
    }
};


module.exports = exports = MatchController;
