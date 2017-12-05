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
            if(person == null) { return res.sendStatus(404);}

            // update criteria and return updated model
            MatchCriteria.findByIdAndUpdate({_id: person.id}, {minAgeOfDog: req.body.minAgeOfDog, maxAgeOfDog: req.body.maxAgeOfDog,
                dogSizeC: req.body.dogSizeC, vetVerificationC: req.body.vetVerificationC, status: req.body.status, locationC: req.body.locationC}, {new: true}, function(err, criteria){
                    if(err){return res.sendStatus(500);}
                    if(criteria == null) {return res.sendStatus(404);}
                    return res.sendStatus(200);
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

            // if no match is made, then insert into other users queue
            MatchCriteria.findById(req.body.id, function(err, matchCriteria){
            // if a match is made,  create a new friend join document
            if(matchCriteria.topUserId().liked == req.body.liked){
                MatchCriteria.findById(req.params.id, function(err, matchCriteria){
                    if(req.body.id != matchCriteria.topUserId()._id){
                        console.log("error in the queue");
                    }
                    // remove user from queue
                    matchCriteria.popUserId();
                    matchCriteria.save();
                });

                var newMatch = Friend({
                    user1: req.params.id,
                    user2: req.body.id
                });

                newMatch.save();
                matchCriteria.save();
                return res.status(200).json({"matched": true});

            } else {
                matchCriteria.highPriorityInsertId(req.params.id);
                matchCriteria.save();
                return res.status(200).json({"matched": false});
            }
        });

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
