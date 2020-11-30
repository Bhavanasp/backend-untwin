const express = require('express');
const router = express.Router({mergeParams:true});
const Post = require('../models/Post');
const auth = require('../middlewares/auth');
const multer = require('multer');
const Comment = require('../models/Comment');

const upload = multer();
router.post('/api/posts/:id/comments',auth,upload.single('image'),(req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        if(err){
            console.log(err);
        }else{
            var data = {
                title:req.body.title,
                description:req.body.description,
                image:(req.file !== null)?{
                    data:req.file.buffer,
                    contentType: req.file.contentType
                }:null,
                author:{
                    id:req.user._id
                }
            };
            Comment.create(data,(err,comment)=>{
                if(err){
                    console.log(err);
                }else{
                    post.comments.push(comment);
                    post.save();
                    res.json({
                        message:"commnet succesfully added"
                    })
                }
            })
        }
    });
});


module.exports = router;