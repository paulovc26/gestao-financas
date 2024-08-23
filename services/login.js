import jwt from "jsonwebtoken";
import moongose from "mongoose";

function isAuth(req, res) {
  const { email, password } = req.params;
  if (!email) {
    res.status(422).json({ msg: "Email não cadastrado" });
  }
}
