import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
import confessionRoutes from "./routes/confessionsRoutes.js";
import facultyReviewRoutes from './routes/facultyReviewRoutes.js';
import questionBankRoutes from "./routes/questionBankRoutes.js";

import dotenv from 'dotenv';
dotenv.config()

const __dirname = path.resolve();
global.__basedir = __dirname;

const port = process.env.PORT || 8000;
const connection_url =
  `mongodb+srv://quovit-admin:${process.env.MONGO_PWD}@cluster0.zxhlc.mongodb.net/quovitdb?retryWrites=true&w=majority`;
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
app.use("/facultyReviews",facultyReviewRoutes);
app.use("/questionBank",questionBankRoutes);

app.get("/", (req, res) => res.status(200).send("OK"));

app.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`));
