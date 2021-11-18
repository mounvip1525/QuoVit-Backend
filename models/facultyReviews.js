import mongoose from "mongoose"

const facultyReviewSchema = new mongoose.Schema({
    facultyName:{
        type:String,
        required: true,
        unique:true
    },
    facultyCMRating:{
        type:Number,
        required:true,
        default:0,
        min:0,
        max:5
    },
    numOfVotes:{
        type:Number,
        default:0,
    },
    voters:{
        type:Array,
        default:[]
    }
})
export default mongoose.model("facultyReview",facultyReviewSchema)