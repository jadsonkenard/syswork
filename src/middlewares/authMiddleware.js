import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../database/models/index.js";

const { User } = db;

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export async function authenticateToken(req, res, next) {
  try {
    // ---- Agora buscamos o token nos cookies ----
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Token não fornecido." });
    }

    // ---- Validar token ----
    const decoded = jwt.verify(token, ACCESS_SECRET);

    // ---- Buscar usuário no banco ----
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    if (user.status === "inactive") {
      return res
        .status(403)
        .json({ message: "Conta inativa. Consulte o administrador." });
    }

    // ---- Anexar usuário à requisição ----
    req.user = user;

    return next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
}
