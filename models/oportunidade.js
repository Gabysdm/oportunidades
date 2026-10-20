// O Sequelize é a ferramenta que conecta o Node ao Banco de Dados.
// DataTypes define que tipo de dado vai em cada coluna (texto, data, etc).
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // Aqui estamos "desenhando" a tabela no banco de dados.
  const Oportunidade = sequelize.define("Oportunidade", {
    // Título: texto curto (STRING). Não pode ser vazio (allowNull: false).
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Instituição: texto curto.
    instituicao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Modalidade: (bolsa, estágio, curso...). Texto curto.
    modalidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Prazo: Data limite. DATEONLY significa que queremos apenas a data (sem hora).
    prazo: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // Descrição: texto longo (TEXT) para explicar os requisitos.
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  return Oportunidade;
};