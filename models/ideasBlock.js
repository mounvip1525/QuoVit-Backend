import mongoose from "mongoose";

const ideasBlockSchema = mongoose.Schema(
  {
    creator:{
        name:String,
        tagLine: String,
        profileImg:String,
        id:String
    },
    idea:{
        type:String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    link:String,
  },
  { timestamps: true }
);

export default mongoose.model("ideasBlock", ideasBlockSchema);
