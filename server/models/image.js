import mongoose from "mongoose";

const ImageSchema = mongoose.Schema({
    imageUrl:{
        type:String
    },
    imageCaption:{
        type:String,
    },
    postedBy:{
        type:String,
    },
    email:{
        type:String,
    },
    createAt:{ type: Date, default: Date.now }
});

export default mongoose.model("ImageSchema", ImageSchema);
