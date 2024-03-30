import imageSchema from '../models/image.js'
import tweetSchema from '../models/tweet.js'
import videoSchema from '../models/video.js'
import cloudinary from 'cloudinary';
import { ObjectId } from 'mongodb'
const  CloudUpload = cloudinary.v2;

// Function to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
};

export const Addtweet = async (req,res)=>{
    try{
      const {tweet,postedBy,email} = req.body;
      
      if(!tweet){
        return res.status(400).json({
          success:false,
          message:"No data found"
        })
      }
  
      //add tweet to db
      const tweetdata = await tweetSchema.create({tweet:tweet,postedBy,email});
  
      //send Response
      return res.status(200).json({
        success:true,
        data:tweetdata,
        message:"Data Uploaded Successfully"
      })
    }
    catch(err){
      console.log(err);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      })
    }
  }
  export const AddImage = async (req,res)=>{
    try{
  
      const imagefile = req.files.image1;
  
      const {imageCaption,postedBy,email} = req.body;
  
      if(!imagefile || imagefile===undefined){
        return res.status(400).json({
          success:false,
          message:"No data found"
        })
      }
  
      let imageUrl;
      try{
        const options = {folder:"StackOverflowimage"}
        options.resource_type="auto";
        const imageRes = await CloudUpload.uploader.upload(imagefile.tempFilePath,options)
        imageUrl = imageRes.secure_url
        }
        catch(err){
          console.log("Can't Upload image to Cloudinary");
        }
        
        //Upload data to db
        const imageData = await imageSchema.create({imageUrl:imageUrl,imageCaption,postedBy,email})
  
        // send response
        return res.status(200).json({
          success:true,
          data:imageData,
          message:"image Uploaded Successfully"
        })
    }
    catch(err){
      console.log(err);
      return res.status(500).json({
        success:false,
        message:"Internal Server Error"
      })
    }}
  
    export const AddVideo = async (req,res)=>{
      try{
  
        const videofile = req.files.video1;
        const {videoCaption,postedBy,email} = req.body;
  
        if(!videofile || videofile === undefined){
          return res.status(400).json({
            success:false,
            message:"No data found"
          })
        }
    
        let videoUrl;
        try{
          const options = {folder:"StackOverflowvideo"}
          options.resource_type="auto";
          const videoRes = await CloudUpload.uploader.upload(videofile.tempFilePath,options)
          videoUrl = videoRes.secure_url
          }
          catch(err){
            console.log("Can't Upload video to Cloudinary");
          }
          
          //Upload data to db
          const videoData = await videoSchema.create({videoUrl:videoUrl,videoCaption,postedBy,email})
  
          // send response
          return res.status(200).json({
            success:true,
            data:videoData,
            message:"Video Uploaded Successfully"
          })
      }
      catch(err){
        console.log(err);
        return res.status(500).json({
          success:false,
          message:"Internal Server Error"
        })
      }}
  
      export const getTweet = async (req,res)=>{
        try{
  
          //get tweets from database
          const tweetData = await tweetSchema.find({}).sort({ createAt: -1 });
  
          //send response
          return res.status(200).json({
            success:true,
            data:tweetData,
            message:"Tweet Fetched Successfully"
          })
        }
        catch(err){
        console.log(err);
        return res.status(500).json({
          success:false,
                message:"Internal Server Error"
        })
        }}
  
  export const getImage = async (req,res)=>{
          try{
    
            //get Images from database
            const ImageData = await imageSchema.find({}).sort({ createAt: -1 });
  
            //send response
            return res.status(200).json({
              success:true,
              data:ImageData,
              message:"Image Fetched Successfully"
            })
          }
          catch(err){
          console.log(err);
          return res.status(500).json({
            success:false,
                  message:"Internal Server Error"
          })
          }}
  
  export const getVideo = async (req,res)=>{
            try{
              
              //get Videos from database
              const VideoData = await videoSchema.find({}).sort({ createAt: -1 });
              //send response
              return res.status(200).json({
                success:true,
                data:VideoData,
                message:"Video Fetched Successfully"
              })
            }
            catch(err){
            console.log(err);
            return res.status(500).json({
              success:false,
                    message:"Internal Server Error"
            })
            }}
  
export const deleteImage = async(req,res,next)=>{
  try{
    const {id} = req.body;
    if(!id) return res.json({message:"Id is required"})
    if(!isValidObjectId(id)) return res.status(400).json({success: false,msg:"Invalid Object Id"})
    const data = await imageSchema.findById(id);
    if (!data) return res.json({message:"No Image is Associated with this Id"})

    await imageSchema.findByIdAndDelete(id)
    return res.status(200).json({success:true,msg:"Image deleted Successfully"})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
            message:"Internal Server Error"
    })
  }
}

export const deleteVideo = async(req,res,next)=>{
  try{
    const {id} = req.body;
    if(!id) return res.json({message:"Id is required"})

    const data = await videoSchema.findById(id);
    if (!data) return res.json({message:"No Video is Associated with this Id"})

    await videoSchema.findByIdAndDelete(id)
    return res.status(200).json({success:true,msg:"Video deleted Successfully"})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
            message:"Internal Server Error"
    })
  }
}

export const deleteTweet = async(req,res,next)=>{
  try{
    const {id} = req.body;
    if(!id) return res.json({message:"Id is required"})

    const data = await tweetSchema.findById(id);
    if (!data) return res.json({message:"No Tweet is Associated with this Id"})

    await tweetSchema.findByIdAndDelete(id)
    return res.status(200).json({success:true,msg:"Tweet deleted Successfully"})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
            message:"Internal Server Error"
    })
  }
}