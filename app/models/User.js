'use strict';

const mongodb = require ('@onehilltech/blueprint-mongodb');


// User Schema
var userSchema = new mongodb.Schema({

    firstName: {type: String, required: true, trim: true},

    lastName: {type: String, required: true, trim: true},

    email: {type: String, required: true, unique: true, trim: true},

    password: {type: String, required: true, hidden: true},

    gender: {type: String, required: true, trim: true},

    bio: {type: String, trim: true},

    homeAddress: {type: String, required: true, trim: true},

    // the current status of the dog(s)
    status: {type: String, required: true, trim: true},

    birthday: {type: Date, required: true, trim: true},

    activated: {type: Boolean},

    // allow the user to own multiple dogs
    dog: [{
        firstName: {type: String, required: true, trim: true},

        lastName: {type: String, trim: true},

        bio: {type: String, trim: true},

        gender: {type: String, required: true, trim: true},

        breed: {type: String, required: true, trim: true},

        birthday: {type: Date, required: true, trim: true},

        size: {type: String, required: true, trim: true},

        fixed: {type: String, required: true, trim: true},

        vetVerification: {type: [String], required: true, trim: true}
    }]
});


userSchema.methods.checkPassword = function(password){
    return this.password == password;
};

userSchema.methods.checkEmail = function(email){
    return this.email == email;
};

userSchema.methods.updateAct = function(varBool){
    this.activated = varBool;
};

userSchema.methods.getActivation = function(){
    return this.activated;
};

const COLLECTION_NAME = 'users';
const MODEL_NAME = 'user';

module.exports = mongodb.resource(MODEL_NAME, userSchema, COLLECTION_NAME);
