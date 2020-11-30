const mongoose = require('mongoose');

const issuecommentSchema = mongoose.Schema({
    title:String,
    description:String,
    image:{
        data:Buffer,
        contentType:String
    },
    author:{
        id:{
           type:mongoose.Schema.Types.ObjectId,
           ref:"User"
        },
    },
});

module.exports = mongoose.model("IssueComment",issuecommentSchema);