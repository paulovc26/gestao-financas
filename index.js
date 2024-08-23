import express from "express";
import dbConnection from "./connection/db.js";
import cors from "cors";
import { createUser } from "./controllers/UserController.js";

dbConnection();

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3000, function () {
  console.log("app live port 3000");
});

app.post("/cadastrar", createUser);
