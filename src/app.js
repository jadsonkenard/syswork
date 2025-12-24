// # inicializa o express e usa as rotas
import checkEnvironment from "./api/checkEnvironment.js";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import PositionRoutes from "./routes/positionRoutes.js";
import DepartmentRoutes from "./routes/departmentRoutes.js";
import TicketRoutes from "./routes/ticketRoutes.js";
import UserRoutes from "./routes/userRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import isLoggedRoutes from "./routes/isLoggedRoutes.js";


import { authenticateToken } from "./middlewares/authMiddleware.js";

const app = express();

app.use(checkEnvironment);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(AuthRoutes);

app.use("/api/auth/me", isLoggedRoutes);

app.use("/department", authenticateToken, DepartmentRoutes);
app.use("/positions", authenticateToken, PositionRoutes);
app.use("/ticket", authenticateToken, TicketRoutes);
app.use("/users", authenticateToken, UserRoutes);

export default app;
