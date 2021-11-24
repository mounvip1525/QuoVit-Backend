import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    githubUsername:String,
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
    savedPosts:{
        type:Array,
        default:[]
    },
    workExperience:{
      type:Array,
      default:[]
    },
    skills:{
      type:Array,
      default:[]
    },
    projects:{
      type:Array,
      default:[]
    },
    about:{
      type:String,
      default:""
    },
    linkedIn:{
      type:String,
      default:""
    },
    expertise: {
      type:String,
      default:null
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);