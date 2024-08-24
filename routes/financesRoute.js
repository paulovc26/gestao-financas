import express from "express";
import {
  createFinanceEntry,
  getUserFinances,
  getUserTotalFinances,
} from "../controllers/FinancesController.js";
import { checkToken } from "../middlewares/checkauth.js";

const router = express.Router();

router.post("/finance", checkToken, createFinanceEntry);
router.get("/finance", checkToken, getUserFinances);
router.get("/teste", checkToken, getUserTotalFinances);

export default router;
