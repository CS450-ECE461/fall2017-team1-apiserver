var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    Message = require('../models/Message'),
    messaging = blueprint.messaging
    util = require ('util');

function MessageController () {
    blueprint.ResourceController.call (this, {name: 'message', model: Message});
}

blueprint.controller (MessageController, blueprint.ResourceController);

// return a list of messages from one user to another
MessageController.prototype.getConversation = function(){
    return function(req, res){
        // return both messages to and from a friend
        Message.find({$or:[
            {$and: [{to: req.params.id}, {from: req.query.userId}]},
            {$and: [{to: req.query.userId}, {from: req.params.id}]}
        ]})
            .sort({date: 'desc'})
            .exec(function(err, conversation){
            if(err){return res.sendStatus(500)}
                if(conversation == null) {res.sendStatus(404)}

                return res.status(200).json(conversation);
        });
    }
}

// create a new message from one user to another
MessageController.prototype.createMessage = function(){
    return function(req, res){
        var newMessage = new Message({
            to: req.body.to,
            from: req.params.id,
            message: req.body.message,
            timeStamp: Date.now()
        });

        newMessage.save(function(err, message){
            if(err){ return res.sendStatus(500); }
          
            messaging.emit ('message.create', message);
            return res.sendStatus(201);
        });
    }
}


module.exports = exports = MessageController;
