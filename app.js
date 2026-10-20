const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
// Importa o banco e o Model
const { sequelize, Oportunidade } = require("./models");
// Importa as rotas
const indexRouter = require("./routes/index");
const oportunidadesRouter = require("./routes/oportunidades");

function createApp() {
  const app = express();

  // Configurando o Handlebars (Template Engine)
  app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "main", // Toda página usará o layout main.hbs
      layoutsDir: path.join(__dirname, "views", "layouts"),
      partialsDir: path.join(__dirname, "views", "partials"),
      helpers: {
        // Nosso Helper: Formata a data para o padrão brasileiro (DD/MM/AAAA).
        // Usaremos isso na View para não mostrar a data no formato americano.
        formatarData(valor) {
          if (!valor) return "";
          // O Intl.DateTimeFormat é nativo do JavaScript e formata datas.
          return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeZone: "UTC", // Evita que a data "pule" um dia por causa de fuso horário
          }).format(new Date(valor));
        },
      },
    })
  );

  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "views"));

  // Middlewares nativos do Express
  app.use(express.urlencoded({ extended: false })); // Permite ler dados de formulários
  app.use(express.json()); // Permite ler JSON
  app.use(express.static(path.join(__dirname, "public"))); // Permite carregar o CSS e imagens

  // Middleware próprio: Mostra no terminal cada requisição que chega
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next(); // O next() é OBRIGATÓRIO para a requisição continuar!
  });

  // Conectando as rotas às URLs
  app.use("/", indexRouter);
  app.use("/oportunidades", oportunidadesRouter); // Tudo que começar com /oportunidades vai pro oportunidadesRouter

  // Middleware 404: Se a requisição passou por tudo e não caiu em nenhuma rota acima, é erro 404.
  app.use((req, res) => {
    res.status(404).render("404", {
      titulo: "Página não encontrada",
      mensagem: "O endereço informado não corresponde a uma página disponível.",
    });
  });

  // Middleware 500: Trata erros inesperados do servidor (ex: banco caiu).
  // Ele tem 4 parâmetros (erro, req, res, next) para o Express saber que é um tratador de erro.
  app.use((erro, req, res, next) => {
    console.error("Erro tratado pela aplicação:", erro);
    if (res.headersSent) {
      return next(erro);
    }
    return res.status(500).render("erro", {
      titulo: "Erro interno",
      mensagem: "Não foi possível concluir a solicitação. Tente novamente.",
    });
  });

  return app;
}

// Função para preparar o banco (criar tabela e inserir dados iniciais)
async function prepararBanco() {
  await sequelize.authenticate(); // Testa a conexão
  await sequelize.sync(); // Cria a tabela se ela não existir

  // Conta quantos registros existem. Se for 0, insere os dados iniciais.
  const quantidade = await Oportunidade.count();
  if (quantidade === 0) {
    // bulkCreate insere vários registros de uma vez só.
    await Oportunidade.bulkCreate([
      {
        titulo: "Bolsa de extensão",
        instituicao: "Universidade Federal",
        modalidade: "Bolsa",
        prazo: "2024-11-30",
        descricao: "Bolsa para atuar em projetos comunitários. Requisitos: estar matriculado e ter disponibilidade de 20h semanais.",
      },
      {
        titulo: "Estágio em TI",
        instituicao: "Tech Solutions",
        modalidade: "Estágio",
        prazo: "2024-12-15",
        descricao: "Estágio em desenvolvimento web. Requisitos: conhecimento em HTML, CSS e JavaScript. Carga de 6h diárias.",
      },
      {
        titulo: "Curso de férias",
        instituicao: "Instituto de Tecnologia",
        modalidade: "Curso",
        prazo: "2024-12-01",
        descricao: "Curso intensivo de introdução à programação. Gratuito, com certificado. Vagas limitadas.",
      },
      {
        titulo: "Programa de monitoria",
        instituicao: "Departamento de Computação",
        modalidade: "Bolsa",
        prazo: "2024-11-20",
        descricao: "Monitoria para a disciplina de Algoritmos. Requisitos: ter cursado a disciplina com nota acima de 8.",
      },
      {
        titulo: "Seleção para projeto",
        instituicao: "Laboratório de Inovação",
        modalidade: "Projeto",
        prazo: "2024-12-10",
        descricao: "Seleção de alunos para projeto de pesquisa em Inteligência Artificial. Bolsa de R$ 500,00.",
      },
      {
        titulo: "Oficina externa",
        instituicao: "Comunidade Dev",
        modalidade: "Curso",
        prazo: "2024-11-25",
        descricao: "Oficina prática de Git e GitHub. Online e gratuito. Necessário ter computador com internet.",
      }
    ]);
  }
}

module.exports = { createApp, prepararBanco };