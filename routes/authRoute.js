import { createUser, getUsers } from "../controllers/UserController.js";
import { login } from "../controllers/auth.js";
import express from "express";
import { checkToken } from "../middlewares/checkauth.js";

const router = express.Router();

//Lista de rotas

router.post("/auth/register", createUser);
router.post("/auth/login", login);
router.get("/user/:id", checkToken, getUsers);

export default router;
