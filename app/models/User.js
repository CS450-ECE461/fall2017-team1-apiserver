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
    
    geoLocation: {type: String, trim: true},//remove this
    
    //did not add Profile picture..
    birthday: {type: String, required: true, trim: true},
    
    numOfDogs: {type: Number, required: true}//dog objects
});


userSchema.methods.checkPassword = function(password){
    return this.password == password;
};

userSchema.methods.checkEmail = function(email){
    return this.email == email;
};


//Some testing methods for the userSchema
userSchema.methods.printFn = function(){
    console.log(this.firstName);
};

const COLLECTION_NAME = 'users';
const MODEL_NAME = 'user';

module.exports = mongodb.resource(MODEL_NAME, userSchema, COLLECTION_NAME);
