import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("Rota configurada com sucesso." );
});

export default routes;
