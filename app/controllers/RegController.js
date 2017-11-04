var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    HttpError = blueprint.errors.HttpError,
    User = require('../models/User'),
    util = require ('util'),
    dab = require ('@onehilltech/dab');





function RegController () {
    blueprint.ResourceController.call (this, {name: 'user', model: User});
}

blueprint.controller (RegController, blueprint.ResourceController);


RegController.prototype.createUser = function(){
    var self = this;

    console.log('---------------------------------------- 1');

    return {
        execute: function (req, res, callback) {
            var fn = req.body.FirstName;
            var ln = req.body.LastName;
            var em = req.body.Email;
            var pw = req.body.Password;
            var newUser = new User({

                firstName: 'N/A',
                lastName: 'N/A',
                email: 'N/A',
                password: 'N/A',

                gender: 'N/A',

                bio: 'N/A',

                homeAddress: 'N/A',

                status: 'N/A',

                birthday: Date.UTC((1970), (0), 0, 0, 0, 0),

                activated: false,

                dog: [{
                    firstName: 'N/A',

                    lastName: 'N/A',

                    bio: 'N/A',

                    gender: 'N/A',

                    breed: 'N/A',

                    birthday: Date.UTC((1970), (0), 0, 0, 0, 0),

                    size: 'N/A',

                    fixed: 'N/A',

                    vetVerification: ['N/A']
                }]
            });
            newUser.save(function(err, newUser) {
                if (err) return callback(new HttpError (500, 'Failed to save user'));

            res.status(200).json(newUser.id);
            return callback(null);
            });
            console.log('---------------------------------------- 2');
            console.log('---------------------------------------- 3');
        }

    };

};




module.exports = exports = RegController;

