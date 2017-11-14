'use strict';

const blueprint = require ('@onehilltech/blueprint'),
    mongodb = require ('@onehilltech/blueprint-mongodb'),
    ObjectId = mongodb.Schema.Types.ObjectId,
    User = require('./User');


// the C after variable names stands for " Criteria ". Put it there just to have separate names from user schema.
var criteriaSchema = new mongodb.Schema({
    minAgeOfDog: {type: Number, trim: true},

    maxAgeOfDog: {type: Number, trim: true},

    dogSizeC: {type: String, trim: true},

    vetVerificationC: {type: Boolean, trim: true},

    statusC: {type: String, trim: true},

    locationC: {type: String, trim: true},//this will change in the future once location is set up.

    potentialMatchesQueue :{type: [ObjectId], ref: User}
    });




//criteria model methods

//We might not need all the rest of the getters/setters, but have them here for now.


criteriaSchema.methods.getDogMinAge = function(){
    return this.minAgeOfDog;
};

criteriaSchema.methods.getDogMaxAge = function(){
    return this.maxAgeOfDog;
};

criteriaSchema.methods.getDogSize = function(){
    return this.dogSizeC;
};

criteriaSchema.methods.getDogVerification = function(){
    return this.vetVerificationC;
};

criteriaSchema.methods.getStatus = function(){
    return this.statusC;
};

criteriaSchema.methods.getLocation = function(){
    return this.locationC;
};

criteriaSchema.methods.setDogMinAge = function(){
    return this.minAgeOfDog;
};

criteriaSchema.methods.setDogMaxAge = function(){
    return this.maxAgeOfDog;
};

criteriaSchema.methods.setDogSize = function(){
    return this.dogSizeC;
};

criteriaSchema.methods.setDogVerification = function(){
    return this.vetVerificationC;
};

criteriaSchema.methods.setStatus = function(){
    return this.statusC;
};

criteriaSchema.methods.setLocation = function(){
    return this.locationC;
};


const COLLECTION_NAME = 'MatchCriterias';
const MODEL_NAME = 'MatchCriteria';

module.exports = mongodb.resource(MODEL_NAME, criteriaSchema, COLLECTION_NAME);