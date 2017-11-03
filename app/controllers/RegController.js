var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    User = require('../models/User'),
    util = require ('util'),
    dab = require ('@onehilltech/dab');





function RegController () {
    blueprint.ResourceController.call (this, {name: 'user', model: User});
}

blueprint.controller (RegController, blueprint.ResourceController);


RegController.prototype.createUser = function(){
    return function(req, res) {
        var fn = req.body.FirstName;
        var ln= req.body.LastName;
        var em = req.body.Email;
        var pw = req.body.Password;
        console.log('---------------------------------------- 1');

        var data = {

            users: dab.times(1, function (data, opts, callback) {
                return callback(null, {

                    firstName: fn,
                    lastName: ln,
                    email: em,
                    password: pw,

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
                })

            })
        }
        console.log('---------------------------------------- 2');
        dab.build (data, function (err, data) {
            // data is the generated data
        });
        console.log('---------------------------------------- 3');
    }
}




module.exports = exports = RegController;
