import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    desc: {
      type: String
    },
    img: {
      type: String
    }, 
    likes: {
      type: Array,
      default: [],
    },
    // comments: [{
    //     creator:String,
    //     comment:String
    // }],
    // saved: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("post", postSchema);
