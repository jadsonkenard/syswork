import sequelize from "./src/config/database.js";

try {
  await sequelize.authenticate();
  console.log("Conexão com o banco estabelecida com sucesso!");
} catch (error) {
  console.error("Erro ao conectar no banco:", error);
}
