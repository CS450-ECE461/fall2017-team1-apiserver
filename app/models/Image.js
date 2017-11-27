'use strict';

const blueprint = require ('@onehilltech/blueprint'),
    mongodb = require ('@onehilltech/blueprint-mongodb'),
    ObjectId = mongodb.Schema.Types.ObjectId;


var imageSchema = new mongodb.Schema({
    //datatype:buffer: Allows us to store our image as data in the form of arrays.
    //image: {data: Buffer, contentType: String},
    image: {type: ObjectId, required: true}
});

const COLLECTION_NAME = 'images';
const MODEL_NAME = 'image';

module.exports = mongodb.resource(MODEL_NAME, imageSchema, COLLECTION_NAME);