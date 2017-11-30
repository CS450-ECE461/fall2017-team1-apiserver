var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    util = require ('util'),
    Image = require('../models/Image'),
    fs = require ('fs'),
    winston = require ('winston');


function ImageController () {
    blueprint.ResourceController.call (this, {name: 'image', model: Image});
}

blueprint.controller (ImageController, blueprint.ResourceController);



ImageController.prototype.uploadImage = function () {
    //nothing for now
};

module.exports = exports = ImageController;