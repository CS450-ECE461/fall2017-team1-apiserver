var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    User = require('../models/User'),
    util = require ('util');

/*
function UserController () {
  ResourceController.call (this, {model: User}); //.call giving me a error
}

blueprint.controller (UserController, ResourceController);
*/

function UserController () {
    blueprint.BaseController.call (this);
}




UserController.prototype.userDisplay = function () {
  return function (req, res) {
      console.log("In User Controller");
      console.log(req.body);
      //User.findOne({'firstName': req.body.firstName});
        
  };
};




blueprint.controller (UserController);
module.exports = UserController;
