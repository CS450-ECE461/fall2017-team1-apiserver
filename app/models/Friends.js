'use strict';

const blueprint = require ('@onehilltech/blueprint'),
    mongodb = require ('@onehilltech/blueprint-mongodb'),
    ObjectId = mongodb.Schema.Types.ObjectId,
    User = require('./User');

// Friends Schema. Effectively a "join" table between to users indicating a friendship (match)
var friendSchema = new mongodb.Schema({

    user1: {type: ObjectId, required: true, ref: User._id },

    user2: {type: ObjectId, required: true, ref: User._id },

    // date of when the 2 users matched
    matched: {type: Date, trim: true}

});



const COLLECTION_NAME = 'friends';
const MODEL_NAME = 'friend';

module.exports = mongodb.resource(MODEL_NAME, friendSchema, COLLECTION_NAME);