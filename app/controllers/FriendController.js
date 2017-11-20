var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    Friends = require('../models/Friends'),
    util = require ('util');



function UserController () {
    blueprint.ResourceController.call (this, {name: 'user', model: Friends});
}

blueprint.controller (UserController, blueprint.ResourceController);

// return all of the friends for a user
UserController.prototype.getFriends = function(){
    return function(req, res){
        // look at either users to see if there is a friendship
        Friends.find({$or:[
            {user1: req.params.id},
            {user2: req.params.id}
        ]}, function(err, friends){
            if(err){return res.sendStatus(500)}
            if(friends == null) {res.sendStatus(404)}

            return res.status(200).json(friends);

        });
    }
}

// create a new friend
UserController.prototype.createFriend = function(){
    return function(req, res){
       console.log(req.body);

       var newFriend = new Friends({
           user1: req.params.id,
           user2: req.body.user2
       });

       newFriend.save(function(err, friend){
           if(err){return res.sendStatus(500)}

           console.log(friend);

           return res.status(201).json(friend);

       });

    }
}






module.exports = exports = UserController;
