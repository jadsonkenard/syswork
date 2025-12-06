import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../database/models/index.js";

const { User } = db;

import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

function generateTokens(user) {
  const payload = {
    id: user.id,
    username: user.username,
    department_id: user.department_id,
    position_id: user.position_id,
    role: user.role,
    status: user.status,
  };

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
    if (!user) throw new Error("Usuário ou senha inválidos.");

    if (user.status === "inactive") {
      throw new Error("Conta inativa. Consulte o administrador.");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Usuário ou senha inválidos.");

    const tokens = generateTokens(user);

    const userData = user.toJSON();
    delete userData.password;

    return { user: userData, ...tokens };
  },

  async refresh(refreshToken) {
    if (!refreshToken) throw new Error("Refresh token não fornecido.");

    try {
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

      const tokens = generateTokens(decoded);
      return tokens;
    } catch (err) {
      throw new Error("Refresh token inválido ou expirado.");
    }
  },
};
