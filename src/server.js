// # ESTE ARQUIVO INICIALIZA A API
import app from "./app.js";
import sequelize from "./config/database.js";
import "./models/associations.js";

const PORT = process.env.PORT;

async function startServer() {
  try {
    await sequelize.authenticate(); //Conexão banco
    console.log("Banco de dados conecado.");

    await sequelize.sync({ alter: false });
    console.log("Tabelas sincronizadas com o banco!");

    app.listen(PORT, () => {
      //Inicia servidor
      console.log("Servidor rodando na porta: " + PORT);
    });
  } catch (error) {
    console.log("Erro ao conectar. " + error);
  }
}

startServer();
