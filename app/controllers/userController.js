var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    User = require('../models/User');
    util = require ('util');

function UserController () {
    blueprint.BaseController.call (this);
}

blueprint.controller (UserController);

UserController.prototype.User = function () {
    var self = this;
    
};

module.exports = exports = UserController;
