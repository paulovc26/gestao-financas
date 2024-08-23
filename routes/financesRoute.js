import express from "express";
import {
  createFinanceEntry,
  getUserFinances,
} from "../controllers/FinancesController.js";
import { checkToken } from "../middlewares/checkauth.js";

const router = express.Router();

router.post("/finance", checkToken, createFinanceEntry);
router.get("/finance", checkToken, getUserFinances);

export default router;
