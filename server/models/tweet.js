import mongoose from "mongoose";

const TweetSchema = mongoose.Schema({
    tweet:{
        type:String
    },
    postedBy:{
        type:String,
    },
    email:{
        type:String,
    },
    createAt:{ type: Date, default: Date.now }
});

export default mongoose.model("TweetSchema", TweetSchema);