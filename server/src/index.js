import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { testRouter } from "./route/test.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/test", testRouter);

mongoose
  .connect(
    "mongodb+srv://frontbacktesting:frontbacktesting@frontbacktesting.ucegmfe.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((e) => console.log("db connected"));

app.listen(3001, () => console.log("server started at 3000"));
