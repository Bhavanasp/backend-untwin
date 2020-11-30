const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const dblink = require('./configs/config').get(process.env.NODE_ENV);
const authRoutes = require('./routes/authroutes');
const commentRoutes = require('./routes/commentroutes')
const postRoutes = require('./routes/postroutes');
const issueRoutes = require('./routes/IssueRoutes');
const issueCommentRoutes = require('./routes/IssueCommentRoutes');

const app = express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(cookieparser());

//DB connections
mongoose.Promise = global.Promise;
mongoose.connect(dblink.DATABASE,{useNewUrlParser:true,useUnifiedTopology:true},
    function(err){
        if(err) console.log(err);
        console.log("DB is connected");
    }
);

app.use(authRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(issueRoutes);
app.use(issueCommentRoutes);

app.get('/',function(req,res){
    res.send('<h1>UnTwin REST API</h1>');
});

app.listen(3000,function(){
    console.log('Server Started!!!');
});