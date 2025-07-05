import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";


connectDB();


/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";

const app = express();
;(   
    async() => {
        try{
            await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
            app.listen(process.env.PORT, ()=>{
            console.log(`server listening on ${process.env.PORT}`)
           })
        }
        catch(error){
            console.log("ERROR:", error);
            throw error
        }
    }
)
();
*/