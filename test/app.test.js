// O node:test é o executor de testes nativo do Node.js.
const test = require("node:test");
const assert = require("node:assert");
// O supertest simula as requisições HTTP (GET, POST) sem precisar ligar o servidor de verdade.
const request = require("supertest");

const { createApp, prepararBanco } = require("../app");

// Antes de rodar os testes, nós "preparamos" o app e o banco.
const app = createApp();
prepararBanco(); // Garante que o banco exista e tenha os dados iniciais.

// Teste 1: Página Inicial
test("GET / deve retornar status 200 e o título 'Oportunidades'", async () => {
  const resposta = await request(app).get("/");
  assert.equal(resposta.status, 200); // Verifica se o status é OK (200)
  assert.match(resposta.text, /Oportunidades/); // Verifica se tem a palavra no HTML
});

// Teste 2: Rota de Saúde
test("GET /saude deve retornar JSON com status ok", async () => {
  const resposta = await request(app).get("/saude");
  assert.equal(resposta.status, 200);
  assert.deepEqual(resposta.body, { status: "ok" });
});

// Teste 3: Listagem
test("GET /oportunidades deve listar um registro inicial", async () => {
  const resposta = await request(app).get("/oportunidades");
  assert.equal(resposta.status, 200);
  // Verifica se algum dos registros iniciais que criamos aparece na tela
  assert.match(resposta.text, /Bolsa de extensão/); 
});

// Teste 4: Detalhes
test("GET /oportunidades/1 deve abrir um registro existente", async () => {
  const resposta = await request(app).get("/oportunidades/1");
  assert.equal(resposta.status, 200);
  assert.match(resposta.text, /Informação principal/);
});

// Teste 5: Erro 404 por ID inexistente
test("GET /oportunidades/99999 deve retornar 404", async () => {
  const resposta = await request(app).get("/oportunidades/99999");
  assert.equal(resposta.status, 404);
  assert.match(resposta.text, /Oportunidade indisponível/);
});

// Teste 6: Erro 404 por ID inválido (letras)
test("GET /oportunidades/abc deve retornar 404", async () => {
  const resposta = await request(app).get("/oportunidades/abc");
  assert.equal(resposta.status, 404);
});

// Teste 7: Rota desconhecida
test("GET /rota-inexistente deve retornar 404", async () => {
  const resposta = await request(app).get("/rota-inexistente");
  assert.equal(resposta.status, 404);
});