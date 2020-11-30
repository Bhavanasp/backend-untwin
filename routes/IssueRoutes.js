const express = require('express');
const router = express.Router({mergeParams:true});
const Issue = require('../models/Issue');
const auth = require('../middlewares/auth');
const multer = require('multer');

router.get("/api/issues",function(req,res){
    Issue.find({},(err,issues)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                issues:issues
            });
        }
    });
});

router.get('/api/issues/:id',(req,res)=>{
    Issue.findById(req.params.id).populate("IssueComments").exec((err,issues)=>{
        if(err){
            console.log(err)
        }else{
            res.json({
                issues: issues
            });
        }
    });
});

router.post("/api/issues",auth,(req,res)=>{
    var data = {
        title:req.body.title,
        description:req.body.description,
        author:{
            id:req.user._id,
            name:req.user.name,
            email:req.user.email
        }
    };
    Issue.create(data,(err,issues)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                message:"successfully uploaded",
                IssuesId: issues._id
            })
        }
    });
})

module.exports = router;