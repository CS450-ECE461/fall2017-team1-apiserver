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


LoginController.prototype.login = function () {
    var self = this;

    return function (req, res) {
        // look up account in the database
        Account.findOne({'username': req.body.username}, function(err, account){
            if(err) return res.sendStatus(500);
            if(account == null) { return res.sendStatus(404); }

            // validate the users password
            account.verifyPassword(req.body.password, function(err, invalid){
                if(invalid){return res.sendStatus(403);}
            });

            // if username and password are valid, return user of the account
            User.findOne({'accountId': account._id}, function(err, user){
                if(err) return res.sendStatus(500);
                if(user == null) { return res.sendStatus(404); }

                return res.status(200).json(user);
            });

        });
    };
};

module.exports = exports = LoginController;
