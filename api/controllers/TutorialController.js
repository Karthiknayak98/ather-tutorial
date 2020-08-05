/**
 * TutorialController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Tutorial = require("../models/Tutorial");
// const async = require('async')
module.exports = {

    addTutorial:async function(req,res){
        var createdRecord = await Tutorial.create(req.body).fetch();
        res.status(201).json(createdRecord)
    },
    updateTutorial:async function(req,res){
        try{
            var updatedRecord = await Tutorial.updateOne({title:req.body.title,id:req.body.id}).set({content:req.body.content});
            if(!updatedRecord){
                return res.status(404).json({error:'Record not found'})
            }
            res.json(updatedRecord)
        }catch(err){
            res.status(500).json(err)
        }
    },
    deleteOneTutorial: async function(req,res){
        try{
            var deleted = await Tutorial.destroy({id:req.params.id}).fetch();
            if(!deleted){
                return res.status(404).json({error:'Record Not found'})
            }
            res.send(deleted)
        }catch(e){
            res.status(500).json(e)
        }
    },
    deleteAll: async function(req,res){
        try{
            var deleted = await Tutorial.destroy({}).fetch();
            if(!deleted){
                return res.status(404).json({error:'Not found'})
            }
            res.send(deleted)
        }catch(e){
            res.status(500).send(e)
        }
    },
    viewTutorials: async function(req,res){
        var page = 1
        var limit =5
        if(req.query.page){
            page = req.query.page
        }
        if(req.query.limit)
            limit = req.query.limit
        try{
            var data = await Tutorial.find({
                where:{title:req.params.title},
                skip: (page-1)*5,
                limit: limit
            });
            res.json(data)
        }catch(e){
            res.status(500).send(e)
        }
    },
    viewAllTutorials: async function(req,res){
        var page = 1
        var limit = 5
        if(req.query.page){
            page = req.query.page
        }
        if(req.query.limit)
            limit = req.query.limit
        try{
            var data = await Tutorial.find({
                where:{title:req.query.title},
                skip: (page-1)*5,
                limit: limit
            });
            res.json(data)
        }catch(e){
            res.status(500).send(e)
        }
    }
};

