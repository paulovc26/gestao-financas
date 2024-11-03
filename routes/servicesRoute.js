import express from "express";
import { amountBalance } from "../services/balance.js";
import { checkToken } from "../middlewares/checkauth.js";

const router = express.Router();

//get
router.get("/mybalance", checkToken, amountBalance);

export default router;
