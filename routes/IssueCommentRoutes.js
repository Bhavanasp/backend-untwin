const express = require('express');
const router = express.Router({mergeParams:true});
const Issue = require('../models/Issue');
const auth = require('../middlewares/auth');
const IssueComment = require('../models/IssueComment');

router.post('/api/posts/:id/issuecomments',auth,(req,res)=>{
    Issue.findById(req.params.id,(err,issue)=>{
        if(err){
            console.log(err);
        }else{
            var data = {
                title:req.body.title,
                description:req.body.description,
                author:{
                    id:req.user._id
                }
            };
            IssueComment.create(data,(err,comment)=>{
                if(err){
                    console.log(err);
                }else{
                    issue.comments.push(comment);
                    issue.save();
                    res.json({
                        message:"commmet succesfully added"
                    })
                }
            })
        }
    });
});


module.exports = router;