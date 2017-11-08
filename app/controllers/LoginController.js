var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    gatekeeper = require('@onehilltech/blueprint-gatekeeper'),
    User = require('../models/User'),
    util = require ('util');

function LoginController () {
    blueprint.BaseController.call (this);
}

blueprint.controller (LoginController);



LoginController.prototype.login = function () {
    var self = this;

    return function (req, res) {
        console.log("login");
        console.log(req.body);
        User.findOne({'email': req.body.email}, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null){
                return res.sendStatus(404);
            } else {
                var actBool = person.getActivation();//see if person is activated or not.
                if (actBool == true){
                    if(!person.checkPassword(req.body.password)) return res.sendStatus(401);
                }
                else{
                    return res.status(200).json('Please check Email for activation link');
                }
            }

            console.log(person);
            //console.log(gatekeeper.);
            return res.status(200).json({_id: person._id, token:'tempToken '});
        });
    };
};

module.exports = exports = LoginController;
