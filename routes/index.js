import authRoute from "./authRoute.js";
import financesRoute from "./financesRoute.js";
import incomesRoute from "./incomesRoute.js";
import servicesRoute from "./servicesRoute.js";

import express from "express";

const router = express.Router();

//Lista de rotas

router.use(authRoute);
router.use(incomesRoute);
router.use(financesRoute);
router.use(servicesRoute);

export default router;
