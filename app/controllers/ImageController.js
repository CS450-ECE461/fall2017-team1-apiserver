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



function sendToS3Bucket(reqFileName, reqFileBody){
  aws.config.loadFromPath('app/configs/aws.config.json');
  aws.config.update({
    signatureVersion: 'v4'
  });
  var s3 = new aws.S3();

  var fileName = shortid.generate() + "-" + reqFileName;
  var fileUrl = 'https://s3.amazonaws.com/supdog/' + fileName;
  var params = {
    Bucket : "supdog",
    ACL : "public-read",
    Key : fileName,
    Body : reqFileBody
  };

  s3.putObject(params, function(err, data) {
    if (err) {
      return res.status(500).send(err)
    }
  });
  return fileUrl;
}



ImageController.prototype.getImageUrl = function () {
  return function(req, res) {
    User.findById(req.params.id, function(err, person){
      if(err) return res.sendStatus(500);
      if(person == null) { return res.sendStatus(404); }
      var fileUrl = person.getUrl();
      return res.status(200).json({message: fileUrl})
    });
  }
};



ImageController.prototype.getDogImageUrl = function () {
  return function(req, res) {
    User.findOneAndUpdate( {_id: req.params.id, 'dog._id': req.params.dogId},
      {'dog.$' : req.body},  {new: true}, function(err, person){

        if(err) return res.sendStatus(500);
        if(person == null) { return res.sendStatus(404); }
        console.log(person);
        var fileUrl = person.getUrl();
        return res.status(200).json({message: fileUrl})
      });
  }
};




ImageController.prototype.uploadImage = function () {
    return function(req, res) {

        if(!req.files){
            console.log("No file was found");
        }
        var fileUrl = sendToS3Bucket(req.file, req.file)


        User.findByIdAndUpdate({_id: req.params.id}, {avatar: fileUrl}, {new: true}, function(err, person){
            if(err){ return res.sendStatus(500); }
            if(person == null) {return res.sendStatus(404);}
            return res.json({message: fileUrl});//error present in this line
        });

    }
};



ImageController.prototype.uploadDogImage = function () {
  return function(req, res) {

    if(!req.files){
      console.log("No file was found");
    }
    var fileUrl = sendToS3Bucket(req.file, req.file)


    User.findOneAndUpdate({_id: req.params.id, 'dog._id': req.params.dogId},
      {avatar: fileUrl},  {new: true}, function(err, person){
        if(err)return res.sendStatus(500);
        if(person == null) { return res.sendStatus(404); }
        console.log(person);
        return res.status(200).json({message: fileUrl});
      });
  }
};


module.exports = exports = ImageController;
