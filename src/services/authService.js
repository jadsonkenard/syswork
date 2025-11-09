import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../database/models/index.js";

const { User } = db;

import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function generateTokens(user) {
  const payload = { id: user.id, username: user.username };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d",
  });

  return { accessToken, refreshToken };
}

export default {
  async login(username, password) {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error("Usuário não encontrado.");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Senha inválida.");

    const tokens = generateTokens(user);

    // Opcional: salvar refreshToken no banco, se quiser invalidar depois
    // await user.update({ refreshToken: tokens.refreshToken });

    const userData = user.toJSON();
    delete userData.password;

    return { user: userData, ...tokens };
  },

  async refresh(refreshToken) {
    if (!refreshToken) throw new Error("Refresh token não fornecido.");

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

      // opcional: verificar se o refreshToken ainda é válido no banco
      // const user = await User.findByPk(decoded.id);
      // if (!user || user.refreshToken !== refreshToken) throw new Error("Refresh token inválido.");

      const tokens = generateTokens(decoded);
      return tokens;
    } catch (err) {
      throw new Error("Refresh token inválido ou expirado.");
    }
  },
};
