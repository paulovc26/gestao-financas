import mongoose from "mongoose";
import User from "../models/User.js";
import Finance from "../models/Finances.js";

export const createFinanceEntry = async (req, res) => {
  const { amount, description } = req.body;

  if (!amount || !description) {
    return res.status(422).json({
      msg: "Nenhum campo pode ser vazio.",
    });
  }

  try {
    const financeEntry = new Finance({
      amount,
      description,
      user: req.userId, // pega o id la do token
    });

    await financeEntry.save();
    res.status(201).json(financeEntry);
  } catch (error) {
    console.error("Erro fatal", error);
    res.status(500).json({
      msg: "erro de servidor",
    });
  }
};

export const getUserFinances = async (req, res) => {
  try {
    const finances = await Finance.find({ user: req.userId }).exec();
    res.status(200).json(finances);
  } catch (error) {
    console.error("Não foi possível obter as finanças do usuário.", error);
    res.status(500).json({
      msg: "erro interno do servidor",
    });
  }
};
