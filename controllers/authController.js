import users from "../models/user.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  const user = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  users.create({...user,password:hashedPassword}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
        const { password, updatedAt,createdAt,__v,isAdmin, ...other } = data._doc;
      res.status(201).send(other);
    }
  });
};

const signin = async (req, res) => {
    const {email} = req.body;
    try {
      const user = await users.findOne({ email: email });
      !user && res.status(404).send("User not found");
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("Wrong password")
      const { password, updatedAt,createdAt,__v,isAdmin, ...other } = user._doc;
      res.status(201).send(other);
    } catch (err) {
      res.status(500).send(err)
    }
  };

export { signup, signin };
