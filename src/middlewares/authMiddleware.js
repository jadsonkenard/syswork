import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token não fornecido." });

  jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Token inválido ou expirado." });
    req.user = decoded;
    next();
  });
}
