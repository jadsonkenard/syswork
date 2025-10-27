// # inicializa o express e usa as rotas
import express from "express";
import teste from "./routes/routes.js";
import PositionRoutes from "./routes/positionRoutes.js";
import DepartmentRoutes from "./routes/departmentRoutes.js";
import TicketRoutes from "./routes/ticketRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", teste);

app.use(PositionRoutes);
app.use(DepartmentRoutes);
app.use(TicketRoutes);

export default app;
