var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    util = require ('util'),
    Image = require('../models/Image');
var http = require('http');
var aws = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require('multer-s3');
var express = require('express');
var app = express();


function ImageController () {
    blueprint.ResourceController.call (this, {name: 'image', model: Image});
}

blueprint.controller (ImageController, blueprint.ResourceController);




// Using an express app currently to just get a simple file upload.
// Once it works, we can replace it with a http module.
ImageController.prototype.uploadImage = function () {
    return function(req, res) {
        console.log('---------------------------------- 1');
        aws.config.loadFromPath('app/configs/aws.config.json');
        aws.config.update({
            signatureVersion: 'v4'
        });

        console.log('---------------------------------- 2');
        var upload = multer();
        console.log('---------------------------------- 2.5');
        //functional up until here. I believe below code should go in the ImageRouter.
        app.post("/uploadImage", multer().any(), function(req, res){
            console.log('---------------------------------- 3');
            var fileName = shortid.generate() + "-" + req.files[0].originalname;
            var params = {
                Bucket : "supdog",
                ACL : "public-read",
                Key : fileName,
                Body : req.files[0].buffer
            };
            console.log('---------------------------------- 3.5');
            s3.putObject(params, function(err, data) {
                console.log('---------------------------------- 4');
                if (err) {
                    res.status(500).send(err)
                }
            });
            console.log('---------------------------------- 5');
            return res.status(200);
        });
    }
}

// This code is using multer-s3 module. Having issues after console.log 4
/*        console.log('---------------------------------- 2');
        var s3 = new aws.S3();
        console.log('---------------------------------- 3');

        var upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: 'supdog',
                acl: 'public-read-write',
                metadata: function (req, file, cb) {
                    cb(null, {fieldName: file.fieldname});
                },
                key: function (req, file, cb) {
                    cb(null, Date.now().toString())
                }
            })
        });

        console.log('---------------------------------- 4');
        app.post('/uploadImage', upload.array('photos', 3), function (req, res, next) {
            res.send('Successfully uploaded ' + req.files.length + ' files!');
        });

        console.log('---------------------------------- 5');*/



//The http module implementation
/*        var options = {
            host: "https://supdog.s3.amazonaws.com",
            port: 80,//port 443 may also work
            method: 'POST',
            path: '/'
        };


        callback = function(response) {
            var str = ''
            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                console.log(str);
            });
        }

        var awsRequest = http.request(options, callback);

        awsRequest.write(req.files[0].buffer);
        awsRequest.end();

        return res.status(200);
    }*/



module.exports = exports = ImageController;