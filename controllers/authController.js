import users from "../models/user.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  const user = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  users.create({...user,password:hashedPassword}, (err, data) => {
    if (err) {
        if(err.code === 11000){
            res.send({message:`${Object.keys(err.keyValue)[0]} already exists`})
        } else
      res.status(500).send(err);
    } else {
        const { password, updatedAt,createdAt,__v,isAdmin, ...other } = data._doc;
      res.status(201).send(other);
    }
  });
};

const signin = async (req, res) => {
    const {email,password} = req.body;
    try {
      const user = await users.findOne({ email: email });
      if(!user){
        res.send({message:"User not found"});
      } else {
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            res.send({message:"Wrong Password"})
        } else {
            const { password, updatedAt,createdAt,__v,isAdmin, ...other } = user._doc;
            res.status(201).send(other);
        }
      }
    } 
    catch (err) {
      res.status(500).send(err);
    }
  };

export { signup, signin };
