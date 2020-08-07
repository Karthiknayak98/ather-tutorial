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
        try{
            var createdRecord = await Tutorial.create(req.body).fetch();
            res.status(201).json(createdRecord)
        }catch(e){
            res.status(500).json({error})
        }
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
                return res.status(404).json({error:'Record Not found'})
            }
            res.send(deleted)
        }catch(e){
            res.status(500).send(e)
        }
    },
    viewOneTutorial: async function(req,res){
        try{
            var data = await Tutorial.find({id:req.params.id});
            if(data.length===0)
                return res.status(404).json({error:'Record not found'})
            res.json(data)
        }catch(e){
            res.status(500).send(e)
        }
    },
    viewAllTutorials: async function(req,res){
        var page = 1
        var limit = 100
        var title = req.query.title
        if(req.query.page){
            page = req.query.page
        }
        if(req.query.limit){
            limit = req.query.limit
        }
        if(!req.query.title)
            title = ''
        try{
            var data = await Tutorial.find({
                where:{title:{contains:title}},
                skip: (page-1)*limit,
                limit: limit
            });
            res.json(data)
        }catch(e){
            res.status(500).send(e)
        }
    }
};

