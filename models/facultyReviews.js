import mongoose from "mongoose"

const facultyReviewSchema = new mongoose.Schema({
    facultyName:{
        type:String,
        required: true
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
    }
})
export default mongoose.model("facultyReview",facultyReviewSchema)