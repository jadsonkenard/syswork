import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../database/models/index.js";

const { User } = db;

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token não fornecido." });
  const decoded = jwt.verify(token, ACCESS_SECRET);
  const user = await User.findByPk(decoded.id);

  if (!user) {
    return res.status(401).json({ message: "Usuário não encontrado." });
  }

  if (user.status === "inactive") {
    return res
      .status(403)
      .json({ message: "Conta inativa. Consulte o administrador." });
  }

  req.user = user;

  jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Token inválido ou expirado." });
    req.user = decoded;
    next();
  });
}
