// # inicializa o express e usa as rotas
import express from "express";

import PositionRoutes from "./routes/positionRoutes.js";
import DepartmentRoutes from "./routes/departmentRoutes.js";
import TicketRoutes from "./routes/ticketRoutes.js";
import UserRoutes from "./routes/userRoutes.js";

import { authenticateToken } from "./middlewares/authMiddleware.js";

import AuthRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use("/department", authenticateToken, DepartmentRoutes);
app.use("/positions", authenticateToken, PositionRoutes);
app.use("/ticket", authenticateToken, TicketRoutes);
app.use("/users", authenticateToken, UserRoutes);

app.use(AuthRoutes);

export default app;
