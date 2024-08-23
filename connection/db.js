import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const uri = process.env.URI;

async function dbConnection() {
  await mongoose
    .connect(uri)
    .then(() => {
      app.listen(4200);
      console.log("db connect");
    })
    .catch();
}
export default dbConnection;
