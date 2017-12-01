var blueprint = require ('@onehilltech/blueprint'),
    util      = require ('util');
var aws = require('aws-sdk');
var shortid = require('shortid');
var multer  = require('multer');
var exif = require('exif').ExifImage
var amqp = require('amqplib/callback_api');
var image = require('../../models/Image');
var multerS3 = require('multer-s3');
//var express = require('express');
//var app = express();

aws.config.loadFromPath('app/configs/aws.config.json');
aws.config.update({
    signatureVersion: 'v4'
});

var s3 = new aws.S3();
//

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'supdog',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

blueprint.app.post('/upload', upload.array('photos', 3), function(req, res, next) {
    res.send('Successfully uploaded ' + req.files.length + ' files!');
});



