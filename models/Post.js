const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:String,
    description:String,
    image:{
        data:Buffer,
        contentType:String
    },
    author:{
           id:mongoose.Schema.Types.ObjectId,
           name:String,
           email:String
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Post",postSchema);