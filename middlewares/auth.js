const User = require('../models/User');

let auth = function(req,res,next){
    let token = req.cookies.auth;
    console.log(token)
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            error :true
        });

        req.token= token;
        req.user=user;
        next();
    })
}

module.exports =  auth;