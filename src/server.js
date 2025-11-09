import app from "./app.js";
import db from "./database/models/index.js";

const PORT = process.env.PORT;

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Banco de dados conectado.");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error);
  }
}

startServer();
