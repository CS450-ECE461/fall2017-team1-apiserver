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

    status: {type: String, trim: true},

    locationC: {type: String, trim: true},//this will change in the future once location is set up.

    lastInsertedId: {type: Number, default: 0},

    potentialMatchesQueue:{type: [{"id":ObjectId, "liked":Boolean}], default: {"liked": false}, ref: User}
    });




//queue.push("SOMETHING") is same as enqueue.
criteriaSchema.methods.lowPriorityInsertId = function(aObjectID){
    // if the id doesn't already exit, add it in the queue
    if(this.potentialMatchesQueue.includes({"_id": aObjectID}) == false){
        this.potentialMatchesQueue.push({"_id":aObjectID, "liked": false});  
    }
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
    if(this.potentialMatchesQueue.includes({"_id": aObjectID}) == false){
        this.potentialMatchesQueue.splice(this.lastInsertedId, 0, {"_id": aObjectID, "liked": true});
        this.lastInsertedId++;
    }
};




const COLLECTION_NAME = 'MatchCriterias';
const MODEL_NAME = 'MatchCriteria';

module.exports = mongodb.resource(MODEL_NAME, criteriaSchema, COLLECTION_NAME);