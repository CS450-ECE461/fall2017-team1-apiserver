var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    User = require('../models/User'),
    util = require ('util');



function RegController () {
    blueprint.ResourceController.call (this, {name: 'user', model: User});
}

blueprint.controller (RegController, blueprint.ResourceController);


RegController.prototype.createUser = function(){
    return function(req, res) {
        var firstName = req.body.FirstName;
        var lastName = req.body.LastName;
        var email = req.body.Email;
    }
}




module.exports = exports = RegController;
