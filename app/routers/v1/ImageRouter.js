var aws = require('aws-sdk');
var shortid = require('shortid');
var multer  = require('multer');
var exif = require('exif').ExifImage
var amqp = require('amqplib/callback_api');
var image = require('../../models/Image');

aws.config.loadFromPath('../../configs/aws.config');
