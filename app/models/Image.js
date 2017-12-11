'use strict';

const blueprint = require ('@onehilltech/blueprint'),
    mongodb = require ('@onehilltech/blueprint-mongodb'),
    ObjectId = mongodb.Schema.Types.ObjectId;


var imageSchema = new mongodb.Schema({
    url : String,
    name : String,
    userId : String,
    created : Date,
    gps : {
        longitude : Number,
        latitude : Number
    }
});

const COLLECTION_NAME = 'images';
const MODEL_NAME = 'image';

module.exports = mongodb.resource(MODEL_NAME, imageSchema, COLLECTION_NAME);