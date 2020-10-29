const express = require('express');
const router = express.Router({mergeParams:true});
const Post = require('../models/Post');
const auth = require('../middlewares/auth');
const multer = require('multer');

router.get("/api/posts",function(req,res){
    Post.find({},(err,posts)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                posts:posts
            });
        }
    });
});

router.get('/api/posts/:id',(req,res)=>{
    Post.findById(req.params.id).populate("comments").exec((err,post)=>{
        if(err){
            console.log(err)
        }else{
            res.json({
                post:post
            });
        }
    });
});

const upload = multer();
router.post("/api/posts",auth,upload.single('image'),(req,res)=>{
    var data = {
        title:req.body.title,
        description:req.body.description,
        image:{
            data:req.file.buffer,
            contentType: req.file.contentType
        },
        author:{
            id:req.user._id,
            name:req.user.name,
            email:req.user.email
        }
    };
    Post.create(data,(err,post)=>{
        if(err){
            console.log(err);
        }else{
            res.json({
                message:"successfully uploaded",
                postId: post._id
            })
        }
    });
})

module.exports = router;