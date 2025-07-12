import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret:  process.env.API_SECRET
    });
 
    
const uploadOnCloudinary = async(localFilePath) => {
    try{
        if(!localFilePath) return null
        //upload file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: auto
        })
        console.log("file uploaded at", response.url)
        return response

    }
    catch(error){
        fs.unlinkSync(localFilePath)
        return null

    }
}

export {uploadOnCloudinary}