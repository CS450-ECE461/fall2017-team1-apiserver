var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    gatekeeper = require('@onehilltech/blueprint-gatekeeper'),
    User = require('../models/User'),
    Account = blueprint.app.models.Account,
    util = require ('util');

function LoginController () {
    blueprint.BaseController.call (this);
}

blueprint.controller (LoginController);

//console.log(blueprint.app.models.Account);

LoginController.prototype.login = function () {
    var self = this;

    return function (req, res) {
        console.log("login");
        console.log(req.body);
        User.findOne({'email': req.body.email}, function(err, person){
            if(err) return res.sendStatus(500);
            if(person == null) { return res.sendStatus(404); }

            Account.findOne({_id: person.accountId}, function(err, account){
                if(err) return res.sendStatus(500);
                if(account == null) { return res.sendStatus(404); }

                console.log(person);
                console.log(account);
                return res.status(200).json({_id: person._id, token:account.});
            });
        });
    };
};

module.exports = exports = LoginController;
