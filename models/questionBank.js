import mongoose from "mongoose"

const questionBankSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    courseCategory:{
        type:String,
        required:true
    },
    questionPapers:{
        cat1:[{
            year:{
                type:String,
                default:new Date().getFullYear()
            },
            paper:{
                type:String
            }
        }],
        cat2:[{
            year:{
                type:String,
                default:new Date().getFullYear()
            },
            paper:{
                type:String
            }
        }],
        fat:[{
            year:{
                type:String,
                default:new Date().getFullYear()
            },
            paper:{
                type:String
            }
        }],
    }
    
},{timestamps:true})

export default mongoose.model("questionBank",questionBankSchema)