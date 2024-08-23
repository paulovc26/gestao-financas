import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name) {
    return res.status(422).json({ msg: "nome é obrigatório" });
  }
  if (!email) {
    return res.status(422).json({ msg: "email é obrigatório" });
  }
  if (!password) {
    return res.status(422).json({ msg: "senha é obrigatório" });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({ msg: "Senha não coincide" });
  }

  //check if user exists

  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(422).json({
      msg: "Email já utilizado.",
    });
  }

  // create hash salt password

  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  // create user

  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "usuario criado!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "erro no servidor",
    });
  }
};

// get users

export const getUsers = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id, "-password");
  if (!user) {
    return res.status(440).json({ msg: "user not found" });
  }

  return res.status(200).json({ user });
};
