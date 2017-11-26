'use strict';

const blueprint = require ('@onehilltech/blueprint'),
    mongodb = require ('@onehilltech/blueprint-mongodb'),
    ObjectId = mongodb.Schema.Types.ObjectId,
    User = require('./User');

// Friends Schema. Effectively a "join" table between to users indicating a friendship (match)
var friendSchema = new mongodb.Schema({

    from: {type: ObjectId, required: true, ref: User._id },

    to: {type: ObjectId, required: true, ref: User._id },

    message: {type: String, required: true,  trim: true},

    // date of when the 2 users matched
    timeStamp: {type: Date, trim: true}

});



const COLLECTION_NAME = 'messages';
const MODEL_NAME = 'message';

module.exports = mongodb.resource(MODEL_NAME, friendSchema, COLLECTION_NAME);