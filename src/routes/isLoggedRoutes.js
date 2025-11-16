import { Router } from "express";
import db from "../database/models/index.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const { User } = db;

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username"], // nunca retornar a senha
    });

    return res.json({ user });
  } catch {
    return res.status(500).json({ message: "Erro ao buscar usuário" });
  }
});

export default router;
