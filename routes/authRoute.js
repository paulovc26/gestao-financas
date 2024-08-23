import { createUser } from "../controllers/UserController.js";
import express from "express";

const router = express.Router();

//Lista de rotas

router.post("/auth/register", createUser);

export default router;
