import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const checkToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);
    next();
  } catch (error) {
    res.status(400).json({ msg: "token invalido!" });
  }
};
