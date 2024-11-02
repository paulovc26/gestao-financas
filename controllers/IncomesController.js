// import mongoose from "mongoose";
// import User from "../models/User.js";
import Income from "../models/Incomes.js";

export const createIncomeEntry = async (req, res) => {
  const { amount, source } = req.body;

  if (!amount || !source) {
    return res.status(422).json({
      msg: "Nenhum campo pode ser vazio.",
    });
  }

  try {
    const IncomeEntry = new Income({
      amount,
      source,
      user: req.userId, // pega o id la do token
    });

    await IncomeEntry.save();
    res.status(201).json(IncomeEntry);
  } catch (error) {
    console.error("Erro fatal", error);
    res.status(500).json({
      msg: "erro de servidor",
    });
  }
};

export const updateIncomeEntry = async (req, res) => {
  const { id } = req.params; // Obtém 'id' da rota
  const _id = id; // Usa '_id' para a consulta no MongoDB
  const { amount, source } = req.body;

  try {
    const IncomeEntry = await Income.findById(_id);
    if (!IncomeEntry) {
      return res.status(404).json({
        msg: "Registro não encontrado.",
      });
    }

    // Atualiza somente os campos fornecidos
    if (amount !== undefined) {
      IncomeEntry.amount = amount;
    }
    if (source !== undefined) {
      IncomeEntry.source = source;
    }

    await IncomeEntry.save();

    res.status(200).json(IncomeEntry); // Retorna o documento atualizado
  } catch (error) {
    console.error("Erro fatal:", error);
    res.status(500).json({
      msg: "Erro de servidor",
    });
  }
};

export const getUserIncomes = async (req, res) => {
  try {
    const Incomes = await Income.find({ user: req.userId }).exec();
    res.status(200).json(Incomes);
  } catch (error) {
    console.error("Não foi possível obter as finanças do usuário.", error);
    res.status(500).json({
      msg: "erro interno do servidor",
    });
  }
};

export const getUserTotalIncomes = async (req, res) => {
  try {
    // O userId já é uma string válida
    const userId = req.userId;

    // Agregação para calcular o total de amount
    const result = await Income.aggregate([
      {
        $match: { user: userId }, // Filtra os documentos pelo userId
      },
      {
        $group: {
          _id: null, // Não estamos agrupando por nenhum campo específico
          totalAmount: { $sum: "$amount" }, // Soma todos os valores do campo 'amount'
        },
      },
    ]);

    // Verifica se o resultado contém valores
    if (result.length > 0) {
      res.status(200).json({ totalAmount: result[0].totalAmount });
    } else {
      res.status(200).json({ totalAmount: 0 }); // Nenhum gasto encontrado
    }
  } catch (error) {
    console.error("Erro ao calcular o total de gastos:", error);
    res.status(500).json({
      msg: "Erro interno do servidor",
    });
  }
};

export const deleteEntry = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Iniciando delete");

    const IncomeEntry = await Income.findByIdAndDelete(id);
    if (!IncomeEntry) {
      // Retorna 404 caso não for encontrado
      return res.status(404).json({
        msg: "Entry not exists",
      });
    }

    // resposta se encontrar e deletar
    console.log("Registro deletado com sucesso");
    return res.status(200).json({
      msg: "Entry deleted successfully",
    });
  } catch (error) {
    console.error("Erro do servidor:", error);
    res.status(500).json({
      msg: "Erro do servidor",
    });
  }
};
