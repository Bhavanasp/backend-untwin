const mongoose = require('mongoose');

const issueSchema = mongoose.Schema({
    title:String,
    description:String,
    author:{
           id:mongoose.Schema.Types.ObjectId,
           name:String,
           email:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"IssueComment"
        }
    ]
});

module.exports = mongoose.model("Issue",issueSchema);