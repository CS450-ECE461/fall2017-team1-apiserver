var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    HttpError = blueprint.errors.HttpError,
    User = require('../models/User'),
    MatchCriteria = require('../models/MatchCriteria'),
    util = require ('util');
const sendmail = require('sendmail')();



function RegController () {
    blueprint.ResourceController.call (this, {name: 'user', model: User});
}

blueprint.controller (RegController, blueprint.ResourceController);


//Sends an email to the user with activation link
function sendEmail(userEmail) {
    sendmail({
        from: 'singh65@umail.iu.edu',
        to: userEmail,
        subject: 'Confirmation of Registration-DogTinder',
        html: 'Please click link below to activate your account.' +
        '<br/> Link: http://localhost:5000/v1/reg/confirm/' + userEmail,
    }, function (err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
}






//inserts user into database, by default they are unactivated
RegController.prototype.createUser = function(){
    var self = this;

    return {
        validate: function (req, callback) {
            req.checkBody ('firstName', 'required').notEmpty ();
            req.checkBody ('lastName', 'required').notEmpty ();
            req.checkBody ('email', 'required').notEmpty ();
            req.checkBody ('password', 'required').notEmpty ();

            return callback (req.validationErrors (true));
        },

        sanitize: function (req, callback) {
            req.sanitizeBody ('firstName').escape ().trim ();
            req.sanitizeBody ('lastName').escape ().trim ();
            req.sanitizeBody ('email').escape ().trim ();
            req.sanitizeBody ('password').escape ().trim ();

            return callback (req.validationErrors (true));
        },

        execute: function (req, res, callback) {

            var newMatchCriteria = new MatchCriteria({
                minAgeOfDog: 1,
                maxAgeOfDog: 10,
                dogSizeC: 'medium',
                vetVerificationC: false,
                statusC: 'happy',
                locationC: 'indy'
            });
            newMatchCriteria.save(function(err, newMatchCriteria) {
                if (err) {
                    return callback(new HttpError (500, 'Failed to save matchCriteria'));
                }
            });

            var newUser = new User({
                matchCriteriaId: newMatchCriteria.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
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
                if (err) {
                    return callback(new HttpError (500, 'Failed to save user'));
                }
                res.status(200).json(newUser.id);
                return callback(null);
            });

            //sending confirmation email
            sendEmail(req.body.Email);

        }
    };
};



//Sets activated to true
RegController.prototype.confirmUser = function() {
    return {
        execute: function (req, res, callback) {
            var userEmail = req.params.emailID;
            User.findOneAndUpdate ({'email': userEmail}, {new: true}, function (err, person) {
                if(err) return res.sendStatus(400);
                if(person == null){
                    return res.sendStatus(404);
                } else {
                    person.updateAct(true);
                    console.log(person);
                    person.save();
                }
                return res.status(200).json(person);
            });
        }
    };
};



module.exports = exports = RegController;

