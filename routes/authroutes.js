const express = require('express');
const router = express.Router({mergeParams:true});
const User = require('../models/User');
const auth = require('../middlewares/auth');


router.post('/api/register',function(req,res){
    const myuser = new User(req.body);
    User.findOne({email:myuser.email},function(err,user){
        if(user) return res.status(400).json({auth:false,message:"email exists"});
        myuser.save((err,doc)=>{
            if(err) {console.log(err);
                return res.status(400).json({ success : false});}
            res.status(200).json({
                success:true,
                user : doc
            });
        })
    })
});


router.post('/api/login', function(req,res){
    let token=req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        if(user) return res.status(400).json({
            error :true,
            message:"You are already logged in"
        });
    
        else{
            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id,
                        email : user.email
                    });
                });    
            });
          });
        }
    });
});

router.get('/api/profile',auth,function(req,res){
    res.json({
        'name':req.user.name,
        'email':req.user.email
    });
})

router.get('/api/logout',auth,function(req,res){
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });

}); 

module.exports = router;