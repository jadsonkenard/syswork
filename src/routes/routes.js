import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Rota configurada com sucesso." );
});

export default router;
