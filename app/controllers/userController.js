var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    User = require('../models/User'),
    util = require ('util');



function UserController () {
    ResourceController.call (this, {resource: User});
}

console.log("------------------------------------------------------test 1");
blueprint.controller (UserController, ResourceController);

UserController.prototype.userDisplay = function () {
    console.log("------------------------------------------------------test 2");
  return function (req, res) {
      console.log("------------------------------------------------------test 3");
      console.log(req.body);
      res.sendStatus(200);
      var userName = User.findOne({'firstName': req.body.firstName});
      console.log("------------------------------------------------------test 4");
      console.log(userName);
      console.log("------------------------------------------------------test 5");
        
  };
};





module.exports = exports = UserController;
