import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  amount: Number,
  source: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Referência ao modelo User
});

const Income = mongoose.model("Income", incomeSchema);

export default Income;
