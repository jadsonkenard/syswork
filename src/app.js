// # inicializa o express e usa as rotas
import express from "express";
import teste from "./routes/routes.js";
import PositionRoutes from "./routes/positionRoutes.js";
import DepartamentRoutes from "./routes/departamentRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", teste);

app.use(PositionRoutes);
app.use(DepartamentRoutes);

export default app;
