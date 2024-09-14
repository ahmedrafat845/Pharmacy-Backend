import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'

    }, 
    resetPasswordOTP: { type: String }, 
    otpExpiry: { type: Date }          
},
    {
        timestamps:true
})

export const userModel=mongoose.model('user',userSchema)