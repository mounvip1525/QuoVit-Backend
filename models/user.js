import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    vitemail:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    campus:{
        type:String,
        required:true
    },
    github_uname:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
})

export default mongoose.model("user",userSchema)