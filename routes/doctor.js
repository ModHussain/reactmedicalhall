var express = require('express');

var router = express.Router();

var db=require("../db.js")

//ROUTE 1
router.route('/')

//CREATE
      .post(function(req,res){
        var doctor = new db.Doctor(req.body);
        doctor.save(function(err,doctor){
          if(err)
          res.status(500).json('INTERNAL SERVER ERROR');
          res.status(200).json(doctor);
        })
      })

//READ
      .get(function(req,res){
        db.Doctor.find(function(err,doctors){
          if (err)
          res.status(500).json('INTERNAL SERVER ERROR');
          res.status(200).json(doctors);
        })
      })

//ROUTE 2
router.route('/:doctor_id')

//READ
    .get(function(req,res){
      db.Doctor.find(
      {_id:req.params.doctor_id},function(err,doctor){
       if (err)
       res.status(500).json('INTERNAL SERVER ERROR');
       res.status(200).json(doctor);
      })
     })

//UPDATE

      .put(function(req,res){
        db.Doctor.findById(req.params.doctor_id, function(err,doctor){
          if(err)
          res.status(500).json('INVALID SERVER ERROR');
          doctor.doctor = req.body.doctor;
          doctor.save(function(err,doctor){
            if(err)
            res.status(500).json('INVALID SERVER ERROR');
            res.status(200).json(doctor);
          })
        })
      })

//DELETE
      .delete(function(req,res){
        db.Doctor.remove(
          {_id:req.params.doctor_id}, function(err){
            if(err)
            res.status(500).json('INTERNAL SERVER ERROR');
          }
        );
      });

module.exports = router;
