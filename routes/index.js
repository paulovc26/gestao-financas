import authRoute from "./authRoute.js";

import express from "express";

const router = express.Router();

//Lista de rotas

router.use(authRoute);

export default router;
