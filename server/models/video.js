import mongoose from "mongoose";

const VideoSchema = mongoose.Schema({
    videoUrl:{
        type:String
    },
    videoCaption:{
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

export default mongoose.model("VideoSchema", VideoSchema);