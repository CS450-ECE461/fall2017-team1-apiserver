'use strict';

const blueprint = require ('@onehilltech/blueprint'),
      mongodb = require ('@onehilltech/blueprint-mongodb'),
      ObjectId = mongodb.Schema.Types.ObjectId,
      Account = blueprint.app.models.Account;

console.log(Account);

// User Schema
var userSchema = new mongodb.Schema({

    accountId: {type: ObjectId, required: true, ref: Account._id, const: true },

    firstName: {type: String, required: true, trim: true},

    lastName: {type: String, required: true, trim: true},

    gender: {type: String, required: true, trim: true},

    bio: {type: String, trim: true},

    homeAddress: {type: String,  trim: true},

    // the current status of the dog(s)
    status: {type: String,  trim: true},

    birthday: {type: Date, required: true, trim: true},

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


userSchema.methods.fullName = function(){
    return this.firstName + " " + this.lastName;
}


const COLLECTION_NAME = 'users';
const MODEL_NAME = 'user';

module.exports = mongodb.resource(MODEL_NAME, userSchema, COLLECTION_NAME);
