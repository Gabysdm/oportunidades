const { Sequelize } = require("sequelize");
const path = require("node:path");

// Cria a conexão com um arquivo SQLite chamado database.sqlite na raiz do projeto.
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database.sqlite"),
  logging: false, // Se quiser ver o SQL no terminal, mude para true.
});

// Importa o nosso Model
const Oportunidade = require("./oportunidade")(sequelize);

module.exports = { sequelize, Oportunidade };