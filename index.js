import express from "express";
import dbConnection from "./connection/db.js";
import cors from "cors";

dbConnection();

const app = express();
app.use(cors());

app.listen(3000, function () {
  console.log("app live port 3000");
});
