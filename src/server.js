// # É aqui que você sobe o servidor e faz a conexão com o banco.
import app from "./app.js";
import sequelize from "./config/database.js";

const PORT = process.env.PORT;

async function serverStart() {
  try {
    await sequelize.authenticate();
    console.log("Banco de dados conecado.");

    app.listen(PORT, () => {
      console.log("Servidor rodando na porta: " + PORT);
    });
  } catch (error) {
    console.log("Erro ao conectar. " + error);
  }
}

serverStart();
