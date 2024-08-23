import authRoute from "./authRoute.js";
import financesRoute from "./financesRoute.js";

import express from "express";

const router = express.Router();

//Lista de rotas

router.use(authRoute);
router.use(financesRoute);

export default router;
