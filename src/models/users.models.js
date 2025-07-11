import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    avatar:{
        type: String,
        required: true
    },
    coverImage:{
        type: String,
    },
    watchHistory:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }

    ],
    password:{
        type: String,
        required: [true, "Password is required"]

    },
    refreshToken:{
        type: String
    }
    }, 
    { timestamps: true})


userSchema.pre("save", async function(next) {
    if(!this.isModified){
        return next();
    }
    this.password = bcrypt.hash(this.password, 10);
    next();
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)  
}
userSchema,methods.generateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRY
        }
    )    
}
userSchema.methods.generateRefreshToken= async function(){
    return await jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_EXPIRY,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY
        }
    )

}
export const User = mongoose.model("User", userSchema)