// # ESTE ARQUIVO INICIALIZA A API
import app from "./app.js";
import sequelize from "./config/database.js";
import User from "./models/User.js";
import Position from "./models/Position.js";
import Departament from "./models/Departament.js";
import Ticket from "./models/Ticket.js";

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
