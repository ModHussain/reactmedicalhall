var express = require('express')
var db=require("../db.js")
var router = express.Router();

//ROUTE 1
router.route('/')

//CREATE
      .post(function(req,res){
        var drug = new db.Drug(req.body);
        drug.save(function(err,result){
          if(err)
          res.status(500).json({error:'INTERNAL SERVER ERROR'});
          res.json(drug);
        })
      })

//READ
      .get(function(req,res){
        db.Drug.find(function(err,drugs){
          if (err)
          res.status(500).json({error:'INTERNAL SERVER ERROR'});
          res.json(drugs);
        })
      })

//ROUTE 2
router.route('/:drug_id')

//READ
    .get(function(req,res){
      db.Drug.find(
      {_id:req.params.drug_id},function(err,drug){
       if (err)
       res.status(500).json('INTERNAL SERVER ERROR');
       res.status(200).json(drug);
      })
     })

//UPDATE
      .put(function(req,res){
        db.Drug.findById(req.params.drug_id,function(err,drug){
          if(err)
          res.status(500).json('INTERNAL SERVER ERROR');
          drug.drug = req.body.drug;
          drug.save(function(err,drug){
            if(err)
            res.status(500).json('INVALID SERVER ERROR');
            res.status(200).json(drug);
          })
        })
      })

//DELETE
      .delete(function(req,res){
        db.Drug.remove(
          {_id:req.params.drug_id}, function(err,drug){
            if(err)
            res.status(500).json({error:'INTERNAL SERVER ERROR'});
            res.json(drug);
          }
        );
      });



module.exports = router;
