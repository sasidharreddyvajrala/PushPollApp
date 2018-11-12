const mongoose=require('mongoose');
const schema=mongoose.Schema;

const VoteSchema=new schema({
    os:{
        type:String,
        require
    },
    points:{
        type:String,
        require
    }

});

//creating collection and addschema

const Vote=mongoose.model('Vote',VoteSchema);

module.exports= Vote;