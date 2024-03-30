import cloudinary from 'cloudinary';
const  cloudinaryUse = cloudinary.v2;
import dotenv from "dotenv"
dotenv.config();

const ConnectCloudinary = ()=>{
    try{
        cloudinaryUse.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        });
    }
    catch(err){
        console.log(err);
    }
}

export default ConnectCloudinary