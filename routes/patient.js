var express = require('express');
var router = express.Router();
var db=require("../db.js")

//Added these to support file upload
var gfsService = require('../gfsService')(db.mongoose.connection);
var multer  = require('multer');
var fs = require('fs');


//ROUTE 1
router.route('/')

//CREATE
      .post(multer({dest:'./uploads'}).single('photo'),function(req,res){

        if(req.file) {
            //Upload file upload first
            gfsService.writeFileToDb({
        			readStream:fs.createReadStream(req.file.path),
        			fileName:req.file.originalname,
        			collection:'photos'
        		})
        		.then(function (objectId) {
              var patient = new db.Patient(req.body);
              patient.pictureId=objectId;
              patient.save(function(err,patient){
                if(err)
                res.status(500).json('INTERNAL SERVER ERROR');
                res.status(200).json(patient);
              });
        		},function (error) {
        			res.status(500).send(error);
        		}).finally(function () {
        			fs.unlink(req.file.path);
        		});
        }
        else {
          var patient = new db.Patient(req.body);
          patient.save(function(err,patient){
            if(err)
            res.status(500).json('INTERNAL SERVER ERROR');
            res.status(200).json(patient);
          });
        }
      })

//READ
      .get(function(req,res){
        db.Patient.find(function(err,patients){
          if (err)
          res.status(500).json('INTERNAL SERVER ERRORw' + JSON.stringify(err));
          res.status(200).json(patients);
        })
      })

//ROUTE 2
router.route('/:patient_id')

//READ
    .get(function(req,res){
      db.Patient.find(
      {_id:req.params.patient_id},function(err,patient){
       if (err)
       res.status(500).json('INTERNAL SERVER ERROR');
       res.status(200).json(patient);
      })
     })

//UPDATE

      .put(function(req,res){
        db.Patient.findById(req.params.patient_id, function(err,patient){
          if(err)
          res.status(500).json('INVALID SERVER ERROR');
          patient.name = req.body.name;
          patient.save(function(err,patient){
            if(err)
            res.status(500).json('INVALID SERVER ERROR');
            res.status(200).json(patient);
          })
        })
      })

//DELETE
      .delete(function(req,res){
        db.Patient.remove(
          {_id:req.params.patient_id}, function(err,patient){
            if(err)
            res.status(500).json('INTERNAL SERVER ERROR');
            res.status(200).json('Patient Deleted');
          }
        );
      });

router.route('/picture/:patient_id')

      //READ
          .get(function(req,res){
            db.Patient.findOne(
            {_id:req.params.patient_id},function(err,patient){
             if (err)
             res.status(500).json('INTERNAL SERVER ERROR');

             console.log(JSON.stringify(patient));
             gfsService.readFileFromDb({
               objectId:patient.pictureId,
               writeStream:res,
               collection:'photos'
             })
             .then(function (objectId) {
               res.end();
             },function (error) {
               res.status(500).send(error);
             });
            })
           })
           .put(multer({dest:'./uploads'}).single('photo'),function(req,res){

            console.log('updating file only ' + req.file)
             if(req.file) {
                 //Upload file upload first
                 gfsService.writeFileToDb({
             			readStream:fs.createReadStream(req.file.path),
             			fileName:req.file.originalname,
             			collection:'photos'
             		})
             		.then(function (objectId) {

                  db.Patient.findById(req.params.patient_id, function(err,patient){
                    if(err)
                    res.status(500).json('INVALID SERVER ERROR');
                    patient.pictureId = objectId;
                    patient.save(function(err,patient){
                      if(err)
                      res.status(500).json('INVALID SERVER ERROR');
                      res.status(200).json(patient);
                    })
                  })

             		},function (error) {
             			res.status(500).send(error);
             		}).finally(function () {
             			fs.unlink(req.file.path);
             		});
             }
             else {
                 res.status(404).json('File not found');
             }
           })

module.exports = router;
