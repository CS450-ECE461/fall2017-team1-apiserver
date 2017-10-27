'use strict';

const mongodb = require ('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    firstName: {type: String, required: true, trim: true},

    lastName: {type: String, required: true, trim: true},

    email:{type: String, required: true, unique: true, trim: true},

    password: { type: String, required: true, hidden: true}
});

const COLLECTION_NAME = 'users';
const MODEL_NAME = 'user';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);
