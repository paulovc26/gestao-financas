import express from "express";
import {
  createFinanceEntry,
  deleteEntry,
  getUserFinances,
  getUserTotalFinances,
  updateFinanceEntry,
} from "../controllers/FinancesController.js";
import { checkToken } from "../middlewares/checkauth.js";

const router = express.Router();

//get
router.get("/finance", checkToken, getUserFinances);
router.get("/teste", checkToken, getUserTotalFinances);
//
//post
router.post("/finance", checkToken, createFinanceEntry);
//
// put
router.put("/update/:id", checkToken, updateFinanceEntry);
//
// delete
router.delete("/delete/:id", checkToken, deleteEntry);

export default router;
