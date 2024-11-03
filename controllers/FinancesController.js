// import mongoose from "mongoose";
// import User from "../models/User.js";
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

export const updateFinanceEntry = async (req, res) => {
  const { id } = req.params; // Obtém 'id' da rota
  const _id = id; // Usa '_id' para a consulta no MongoDB
  const { amount, description } = req.body;

  try {
    const financeEntry = await Finance.findById(_id);
    if (!financeEntry) {
      return res.status(404).json({
        msg: "Registro não encontrado.",
      });
    }

    // Atualiza somente os campos fornecidos
    if (amount !== undefined) {
      financeEntry.amount = amount;
    }
    if (description !== undefined) {
      financeEntry.description = description;
    }

    await financeEntry.save();

    res.status(200).json(financeEntry); // Retorna o documento atualizado
  } catch (error) {
    console.error("Erro fatal:", error);
    res.status(500).json({
      msg: "Erro de servidor",
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

export const getUserTotalFinances = async (req, res) => {
  try {
    // O userId já é uma string válida
    const userId = req.userId;

    // Agregação para calcular o total de amount
    const result = await Finance.aggregate([
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
    // // MANDAR AO CLIENT
    // // Verifica se o resultado contém valores
    // if (result.length > 0) {
    //   res.status(200).json({ totalAmount: result[0].totalAmount });
    // } else {
    //   res.status(200).json({ totalAmount: 0 }); // Nenhum gasto encontrado
    // }

    // MANDAR AO SERVICE

    return result.length > 0
      ? { totalAmount: result[0].totalAmount }
      : { totalAmount: 0 };
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

    const financeEntry = await Finance.findByIdAndDelete(id);
    if (!financeEntry) {
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
