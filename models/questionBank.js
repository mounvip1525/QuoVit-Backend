import mongoose from "mongoose"

const questionBankSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        // unique:true
    },
    courseCategory: {
        type: String,
        required: true
    },
    questionPapers:[{
        year:{
            type:String,
            default: new Date().getFullYear()
        },
        paper:{
            type:String
        },
        examType:{
            type:String
        }
    }],

}, { timestamps: true })

export default mongoose.model("questionBank", questionBankSchema)