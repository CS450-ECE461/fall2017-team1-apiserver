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

    lastInsertedId: {type: Number, default: 0},

    potentialMatchesQueue:{type: [ObjectId], ref: User}
    });




//queue.push("SOMETHING") is same as enqueue.
criteriaSchema.methods.lowPriorityInsertId = function(aObjectID){
    this.potentialMatchesQueue.push(aObjectID);
};

//queue.shift() is same as dequeue. It pops off the top element.
criteriaSchema.methods.popUserId = function(){
    if(this.potentialMatchesQueue.length == 0){
        return 0;
    }else{
        if(this.lastInsertedId > 0){
            this.lastInsertedId--;
        }
        return this.potentialMatchesQueue.shift();
    }
};

//Returns the very 1st element in the queue
criteriaSchema.methods.topUserId = function(){
    if(this.potentialMatchesQueue[0] == null){
        return 0;
    }else{
        return this.potentialMatchesQueue[0];
    }

};

criteriaSchema.methods.getNumOfMatches = function(){
    return this.potentialMatchesQueue.length;
};

criteriaSchema.methods.highPriorityInsertId = function (aObjectID) {
    this.potentialMatchesQueue.splice(this.lastInsertedId, 0, aObjectID);
    console.log(' estoy en highPriorityinsertId');
    console.log(this.lastInsertedId);
    this.lastInsertedId++;
    console.log(this.lastInsertedId);
    console.log(' estoy en highPriorityinsertId');
};





//We might not need all the rest of the getters but have them here for now.
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




const COLLECTION_NAME = 'MatchCriterias';
const MODEL_NAME = 'MatchCriteria';

module.exports = mongodb.resource(MODEL_NAME, criteriaSchema, COLLECTION_NAME);