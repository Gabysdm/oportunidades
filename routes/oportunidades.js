const express = require("express");
const router = express.Router();
// Importa o Model Oportunidade para podermos buscar dados no banco.
const { Oportunidade } = require("../models");

// Rota para LISTAR todas as oportunidades
// GET /oportunidades
router.get("/", async (req, res, next) => {
  try {
    // findAll() é o "SELECT * FROM" do SQL. 
    // O order:[["prazo", "ASC"]] significa: ordene pela data do prazo, do menor para o maior (mais próximos primeiro).
    const oportunidades = await Oportunidade.findAll({
  raw: true,
  order: [["prazo", "ASC"]],
});

    // Renderiza a view "listar.hbs" dentro da pasta "oportunidades" e passa a variável "oportunidades".
    res.render("oportunidades/listar", { oportunidades });
  } catch (erro) {
    // Se der erro no banco, manda para o middleware de erro 500.
    next(erro);
  }
});

// Rota para DETALHAR uma oportunidade específica
// GET /oportunidades/:id (o :id é um parâmetro dinâmico, ex: /oportunidades/1)
router.get("/:id", async (req, res, next) => {
  try {
    // Pega o ID da URL e transforma em número.
    const id = Number(req.params.id);

    // Validação: O ID precisa ser um número inteiro maior que zero.
    if (!Number.isInteger(id) || id <= 0) {
      // Se o ID for "abc" ou "-5", cai aqui. Renderiza a página 404.
      return res.status(404).render("404", { mensagem: "Oportunidade indisponível. O identificador é inválido." });
    }

    // findByPk() busca pela Primary Key (ID). É o "SELECT * WHERE id = X".
    const oportunidade = await Oportunidade.findByPk(id, { raw: true });

    // Se a oportunidade não existir no banco (ex: ID 9999).
    if (!oportunidade) {
      return res.status(404).render("404", { mensagem: "Oportunidade indisponível. Não localizamos este registro." });
    }

    // Se achou, renderiza a view de detalhes.
    res.render("oportunidades/detalhar", { oportunidade });
  } catch (erro) {
    next(erro);
  }
});

module.exports = router;