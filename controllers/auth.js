import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  const { email, password } = req.body;
  // validation

  if (!email) {
    return res.status(422).json({ msg: "email é obrigatório" });
  }
  if (!password) {
    return res.status(422).json({ msg: "senha é obrigatório" });
  }

  // check if user exists

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(422).json({ msg: "usuário não encontrado" });
  }

  // check password
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "senha incorreta" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "autenticado com sucesso!", token });
  } catch (error) {
    console.error(error);
  }
};
