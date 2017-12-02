var blueprint = require ('@onehilltech/blueprint'),
    util      = require ('util');
var aws = require('aws-sdk');
//var shortid = require('shortid');
var multer  = require('multer');
//var exif = require('exif').ExifImage
//var amqp = require('amqplib/callback_api');
var image = require('../../models/Image');
var multerS3 = require('multer-s3');
var express = require('express');
var app = express();




