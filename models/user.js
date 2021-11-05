import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true,
    },
    branch:{
        type: String,
        required: true
    },
    campus:{
        type: String,
        default: "Vellore"
    },
    githubUsername:{
        type: String,
        unique: true
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    profileImg: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);