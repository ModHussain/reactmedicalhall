var express = require('express');

var router = express.Router();

var db=require("../db.js")

//This is test change

//ROUTE 1
router.route('/')

//CREATE
      .post(function(req,res){
        var family = new db.Family(req.body);
        family.save(function(err,doctor){
          if(err)
          res.status(500).json('INTERNAL SERVER ERROR');
          res.status(200).json(family);
        })
      })

//READ
      .get(function(req,res){
        db.Family.find(function(err,families){
          if (err)
          res.status(500).json('INTERNAL SERVER ERROR');
          res.status(200).json(families);
        })
      })

//ROUTE 2
router.route('/:family_id')

//READ
    .get(function(req,res){
      db.Family.find(
      {_id:req.params.family_id},function(err,family){
       if (err)
       res.status(500).json('INTERNAL SERVER ERROR');
       res.status(200).json(family);
      })
     })

//UPDATE

      .put(function(req,res){
        db.Family.findById(req.params.family_id, function(err,family){
          if(err)
          res.status(500).json('INVALID SERVER ERROR');
          family.familyName = req.body.familyName;
          family.save(function(err,family){
            if(err)
            res.status(500).json('INVALID SERVER ERROR');
            res.status(200).json(family);
          })
        })
      })

//DELETE
      .delete(function(req,res){
        db.Family.remove(
          {_id:req.params.family_id}, function(err,family){
            if(err)
            res.status(500).json('INTERNAL SERVER ERROR');
            res.status(200).json('Family Deleted');
          }
        );
      });

module.exports = router;
