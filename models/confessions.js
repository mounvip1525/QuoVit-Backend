import mongoose from "mongoose";

const confessionsSchema = mongoose.Schema(
  {
    confession: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("confession", confessionsSchema);
