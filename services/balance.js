import { getUserTotalFinances } from "../controllers/FinancesController.js";
import { getUserTotalIncomes } from "../controllers/IncomesController.js";

export const amountBalance = async (req, res) => {
  try {
    // Obtém o total de saídas
    const { totalAmount } = await getUserTotalFinances(req);

    // Obtém o total de entradas
    const { totalIncome } = await getUserTotalIncomes(req);

    // Calcula o saldo
    const balance = totalIncome - totalAmount;

    // Retorna os valores ao cliente: total de entradas, total de saídas e o saldo
    return res.status(200).json({
      totalIncome,
      totalAmount,
      balance,
    });
  } catch (error) {
    // Trata e retorna o erro
    return res
      .status(500)
      .json({ message: "Erro ao calcular os valores financeiros", error });
  }
};
