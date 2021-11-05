import mongoose from "mongoose";

const ideasBlockSchema = mongoose.Schema(
  {
    creator:{
        name: String,
        tagLine: String
    },
    idea:{
        type:String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    link:{
        type: Array,
        default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("ideasBlock", ideasBlockSchema);
