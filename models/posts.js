import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    creator:String,
    caption: {
      type: String,
      required: true,
    },
    description: String,
    img: String, //base 64 string
    likes: {
      type: String,
      default: 0,
    },
    comments: [{
        creator:String,
        comment:String
    }],
    saved: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("post", postSchema);
