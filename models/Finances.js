import mongoose from "mongoose";

// Defina o esquema para as finanças
const financeSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Referência ao modelo User
});

const Finance = mongoose.model("Finance", financeSchema);

export default Finance;
