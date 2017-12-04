var blueprint = require ('@onehilltech/blueprint'),
    mongodb = ('@onehilltech/blueprint-mongodb'),
    ResourceController = mongodb.ResourceController,
    User = require('../models/User'),
    util = require ('util'),
    Image = require('../models/Image');
var shortid = require('shortid');
var aws = require('aws-sdk');





function ImageController () {
    blueprint.ResourceController.call (this, {name: 'image', model: Image});
}

blueprint.controller (ImageController, blueprint.ResourceController);





ImageController.prototype.uploadImage = function () {
    return function(req, res) {

        if(!req.files){
            console.log("No file was found");
        }


        aws.config.loadFromPath('app/configs/aws.config.json');
        aws.config.update({
            signatureVersion: 'v4'
        });
        var s3 = new aws.S3();

        var fileName = shortid.generate() + "-" + req.file;
        var fileUrl = 'https://s3.amazonaws.com/supdog/' + fileName;
        var params = {
            Bucket : "supdog",
            ACL : "public-read",
            Key : fileName,
            Body : req.file
        };

        s3.putObject(params, function(err, data) {
            if (err) {
                return res.status(500).send(err)
            }
        });
git
        User.findByIdAndUpdate({_id: req.params.id}, {avatar: fileUrl}, {new: true}, function(err, user){
            if(err){ return res.sendStatus(500); }
            if(user == null) {return res.sendStatus(404);}
            return res.json({message: fileUrl});
        });

    }
}



module.exports = exports = ImageController;
