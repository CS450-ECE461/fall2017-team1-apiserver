'use strict';

const mongodb = require ('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    firstName: {type: String, required: true, trim: true},

    lastName: {type: String, required: true, trim: true},

    email:{type: String, required: true, unique: true, trim: true},

    password: { type: String, required: true, hidden: true},
    
    gender: { type: String, required: true, trim: true},
    
    bio: {type: String, trim: true},
    
    homeAddress: {type: String, required: true, trim: true},
    
    geoLocation: {type: String, trim: true},
    
    //did not add Profile picture..
    birthday: {type: String, required: true, trime:true},
    
    numoOfDogs: {type: Int, required: true}
});


schema.methods.checkPassword = function(password){
    return this.password == password;
};

const COLLECTION_NAME = 'users';
const MODEL_NAME = 'user';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);
