var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    messaging = blueprint.messaging
    User = require('../models/User'),
    Friend = require('../models/Friends'),
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

            // update criteria and return updated model
            MatchCriteria.findByIdAndUpdate({_id: person.id}, {minAgeOfDog: req.body.minAgeOfDog, maxAgeOfDog: req.body.maxAgeOfDog,
                dogSizeC: req.body.dogSizeC, vetVerificationC: req.body.vetVerificationC, status: req.body.status, locationC: req.body.locationC}, {new: true}, function(err, criteria){
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

            MatchCriteria.findById({_id: person.id}, function(err, criteria){
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

            // update status and send off event to search db for matches based on criteria
            MatchCriteria.findByIdAndUpdate({_id: person.id}, {status: req.body.status}, {new: true}, function(err, criteria){
                if(err){ return res.sendStatus(500); }
                if(criteria == null) {return res.sendStatus(404);}

                messaging.emit ('status.update', criteria);
                return res.sendStatus(200);
            });
        });
    }
};

MatchController.prototype.match = function(){
    return function(req, res){
        if(req.body.liked == true){


            MatchCriteria.findById(req.params.id, function(err, matchCriteria){
                if(req.body.id != matchCriteria.topUserId()._id){
                    console.log("error in the queue");
                }
                // remove user from queue
                matchCriteria.popUserId();
                matchCriteria.save();
            });
        

            // on match, create a new friend join document
            var newMatch = Friend({
                user1: req.params.id,
                user2: req.body.id
            });

            newMatch.save();

            return res.status(200).json({"matched": true});
        } else {
            MatchCriteria.findById(req.params.id, function(err, matchCriteria){
                if(req.body.id != matchCriteria.topUserId()._id){
                    console.log("error in the queue");
                }
                // remove user from queue
                matchCriteria.popUserId();
                matchCriteria.save();
            });
            return res.status(200).json({"matched": false});
        }
    }
}

module.exports = exports = MatchController;
