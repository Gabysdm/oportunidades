const express = require("express");
const router = express.Router();
const { Oportunidade } = require("../models");

// Rota da página inicial: GET /
router.get("/", async (req, res, next) => {
  try {
    // Busca apenas 3 oportunidades para serem os "Destaques do portal".
    // limit: 3 significa "traga no máximo 3 registros".
    const destaques = await Oportunidade.findAll({
      limit: 3,
      order: [["id", "ASC"]], // Ordem apenas para manter fixo, pode ser aleatória ou por prazo.
    });

    // Renderiza o index.hbs passando os destaques.
    res.render("index", { destaques });
  } catch (erro) {
    next(erro);
  }
});

// Rota de saúde (health check) para saber se a API está de pé.
router.get("/saude", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = router;