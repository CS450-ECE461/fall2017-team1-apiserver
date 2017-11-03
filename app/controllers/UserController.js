var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    User = require('../models/User'),
    util = require ('util');



function UserController () {
    blueprint.ResourceController.call (this, {name: 'user', model: User});
}

blueprint.controller (UserController, blueprint.ResourceController);

console.log("------------------------------------------------------test 1");


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


UserController.prototype.getUser = function(){
    return function(req, res){
        console.log(req);
     return res.sendStatus(404);
    }
}

UserController.prototype.updateUser = function(){
    return function(req, res){
        console.log(req.params.id);
        User.findById(req.params.id, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null){
                return res.sendStatus(404);
            }

            person.update(req.body);

            return res.sendStatus(200);
        });

    }
}




module.exports = exports = UserController;
