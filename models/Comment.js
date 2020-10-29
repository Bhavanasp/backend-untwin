const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
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

module.exports = mongoose.model("Comment",commentSchema);