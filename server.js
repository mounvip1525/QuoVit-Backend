import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import confessionRoutes from "./routes/confessionsRoutes.js";

const port = process.env.PORT || 8000;
const connection_url =
  "mongodb+srv://quovit-admin:quovit@cluster0.zxhlc.mongodb.net/quovitdb?retryWrites=true&w=majority";
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.use("/confessions", confessionRoutes);

app.get("/", (req, res) => res.status(200).send("OK"));

app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));
