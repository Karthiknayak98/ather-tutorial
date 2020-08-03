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
        const title = req.body.title
        const content = req.body.content
        console.log(title +' '+content)
        /* works */
        // var createdRecord = await sails.models.tutorial.create({
        //     title: title,
        //     content: content
        //   }).fetch();

        var createdRecord = await Tutorial.create(req.body).fetch();     
        res.json(createdRecord)
    },
    updateTutorial:async function(req,res){
        try{
            var updatedRecord = await Tutorial.updateOne({title:req.body.title,id:req.body.id}).set({content:req.body.content});
            if(!updatedRecord){
                return res.status(400).send('Record not found')
            }
            //console.log(updatedRecord)
            res.send(updatedRecord)
        }catch(err){
            console.log(err)
            res.status(400).json(err)
        }
    },
    deleteOneTutorial: async function(req,res){
        try{
            var deleted = await Tutorial.destroy({id:req.params.id}).fetch();
            if(!deleted){
                res.send('Not found')
            }
            res.send(deleted)
        }catch(e){
            console.log(e)
            res.status(400).json(e)
        }
    },
    deleteAll: async function(req,res){
        try{
            var deleted = await Tutorial.destroy({}).fetch();
            if(!deleted){
                res.send('Not found')
            }
            res.send(deleted)
        }catch(e){
            res.status(400).send()
        }
    },
    viewTutorials: async function(req,res){
        var page = 1
        if(req.query.page)
            page = req.query.page
        var data = await Tutorial.find({
            where:{title:req.query.title},
            skip: (page-1)*5,
            limit: 5
          });
        res.json(data)
    }
};

