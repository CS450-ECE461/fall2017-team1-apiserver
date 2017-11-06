var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    User = require('../models/User'),
    util = require ('util');



function UserController () {
    blueprint.ResourceController.call (this, {name: 'user', model: User});
}

blueprint.controller (UserController, blueprint.ResourceController);


UserController.prototype.getUser = function(){
    return function(req, res){
        User.findById(req.params.id, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null) { return res.sendStatus(404); }
            console.log(person);
            return res.status(200).json(person);
        });
    }
}

UserController.prototype.updateUser = function(){
    return function(req, res){
        // update user and return updated model
        User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user){
            if(err){ return res.sendStatus(500); }
            if(user == null) {return res.sendStatus(404);}
            return res.status(200).json(user);
        });

    }
}


UserController.prototype.updateStatus = function(){
    return function(req, res){
        // update user and return updated model
        User.findByIdAndUpdate({_id: req.params.id}, {status: req.body.status}, {new: true}, function(err, user){
            if(err){ return res.sendStatus(500); }
            if(user == null) {return res.sendStatus(404);}
            return res.sendStatus(204);
        });

    }
}

UserController.prototype.getDog = function(){
    return function(req, res){
        console.log(req);
        User.findById(req.params.id, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null) { return res.sendStatus(404); }
            var dog = person.dog.find(function(dog) { return dog._id == req.params.dogId; });
            return res.status(200).json(dog);
        });
    }
}

UserController.prototype.addDog = function(){
    return function(req, res){
        console.log(req.body);
        User.findById(req.params.id, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null) { return res.sendStatus(404); }
            person.dog.push(req.body);
            person.save();
            console.log(person);
            return res.status(201).json(person);
        });
    }
}

// the whole dog body will need to be sent, else subdocument will be overwritten
UserController.prototype.updateDog = function(){
    return function(req, res){
        User.findOneAndUpdate(
            {_id: req.params.id, 'dog._id': req.params.dogId},
            {'dog.$' : req.body},  {new: true}, function(err, person){

                if(err) return res.sendStatus(500);
                if(person == null) { return res.sendStatus(404); }
                console.log(person);
                return res.status(200).json(person);
        });
    }
}



module.exports = exports = UserController;
