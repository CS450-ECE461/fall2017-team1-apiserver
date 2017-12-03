var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    util = require ('util'),
    Image = require('../models/Image');
var shortid = require('shortid');
var http = require('http');
var aws = require('aws-sdk');
var multer  = require('multer');
var express = require('express');
var app = express();



function ImageController () {
    blueprint.ResourceController.call (this, {name: 'image', model: Image});
}

blueprint.controller (ImageController, blueprint.ResourceController);





ImageController.prototype.uploadImage = function () {
    return function(req, res) {

        console.log('---------------------------------- 1');
        aws.config.loadFromPath('app/configs/aws.config.json');
        aws.config.update({
            signatureVersion: 'v4'
        });
        var s3 = new aws.S3();

        console.log('---------------------------------- 2');
        var upload = multer();

        console.log('---------------------------------- 2.5');
        var fileName = shortid.generate() + "-" + req.file;
// file : { fieldname, originalname, name,
// encoding, mimetype, path, extension, size, truncated, buffer }
        console.log('---------------------------------- 3');
        var params = {
            Bucket : "supdog",
            ACL : "public-read",
            Key : fileName,
            Body : req.file
        };

        console.log('---------------------------------- 4');
        s3.putObject(params, function(err, data) {
            if (err) {
                res.status(500).send(err)
            }
        });

        console.log('---------------------------------- 5');
        return res.status(200);
    }
}



module.exports = exports = ImageController;