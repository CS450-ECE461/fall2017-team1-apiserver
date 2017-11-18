'use strict';

const blueprint = require ('@onehilltech/blueprint'),
    mongodb = require ('@onehilltech/blueprint-mongodb'),
    ObjectId = mongodb.Schema.Types.ObjectId,
    MatchCriteria = require('./MatchCriteria');


// User Schema
var userSchema = new mongodb.Schema({

    matchCriteriaId: {type: ObjectId, required: true, ref: MatchCriteria, const: true },

    firstName: {type: String, required: true, trim: true},

    lastName: {type: String, required: true, trim: true},

    email: {type: String, required: true, unique: true, trim: true},

    password: {type: String, required: true, hidden: true},

    gender: {type: String, required: true, trim: true},

    bio: {type: String, trim: true},

    homeAddress: {type: String,  trim: true},

    // the current status of the dog(s)
    status: {type: String,  trim: true},

    birthday: {type: Date, required: true, trim: true},

    activated: {type: Boolean},

    // allow the user to own multiple dogs
    dog: [{

        firstName: {type: String,  trim: true},

        lastName: {type: String, trim: true},

        bio: {type: String, trim: true},

        gender: {type: String,  trim: true},

        breed: {type: String,  trim: true},

        birthday: {type: Date,  trim: true},

        size: {type: String,  trim: true},

        fixed: {type: String,  trim: true},

        vetVerification: {type: [String], trim: true}
    }]
});


userSchema.methods.checkPassword = function(password){
    return this.password == password;
};

userSchema.methods.checkEmail = function(email){
    return this.email == email;
};

userSchema.methods.getMatchCriteriaID = function(){
    //
};

userSchema.methods.fullName = function(){
    return this.firstName + " " + this.lastName;
};

userSchema.methods.getAgeOfOwner = function(){
    var now = new Date();
    var age = now.getFullYear() - this.birthday.getFullYear();
    return age;
};

//Registration Methods
userSchema.methods.updateAct = function(varBool){
    this.activated = varBool;
};

userSchema.methods.getActivation = function(){
    return this.activated;
};




const COLLECTION_NAME = 'users';
const MODEL_NAME = 'user';

module.exports = mongodb.resource(MODEL_NAME, userSchema, COLLECTION_NAME);
