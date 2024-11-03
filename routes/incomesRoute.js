import express from "express";
import {
  createIncomeEntry,
  deleteEntry,
  getUserIncomes,
  getUserTotalIncomes,
  updateIncomeEntry,
} from "../controllers/IncomesController.js";
import { checkToken } from "../middlewares/checkauth.js";

const router = express.Router();

//get
router.get("/income", checkToken, getUserIncomes);
router.get("/teste", checkToken, getUserTotalIncomes);
//
//post
router.post("/income", checkToken, createIncomeEntry);
//
// put
router.put("/update/:id", checkToken, updateIncomeEntry);
//
// delete
router.delete("/delete-income/:id", checkToken, deleteEntry);

export default router;
