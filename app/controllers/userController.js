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


blueprint.controller (UserController);

UserController.prototype.userDisplay = function () {
    console.log("test");
  return function (req, res) {
      console.log("In User Controller");
      console.log(req.body);
      res.sendStatus(200);
      //User.findOne({'firstName': req.body.firstName});
        
  };
};





module.exports = exports = UserController;
