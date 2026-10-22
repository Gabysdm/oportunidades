Integrantes do projeto: Lindalva Gabrielly, Atson Felipoo, Luiz Henrique e Júlia Pontes

O Portal Oportunidades tem a função de divulgar bolsas, estágios, cursos, monitorias e seleções para estudantes. A ideia é facilitar o acesso às informações, permitindo listar e ver os detalhes de cada vaga ofertada.

Tecnologias:
Node.js e Express
Express Handlebars
Sequelize e SQLite
Supertest e Node Test 

Modelo de Dados:
A entidade principal é Oportunidade (models/oportunidade.js), com os seguintes campos:

titulo: nome da oportunidade
instituicao: instituição responsável
modalidade: tipo de oportunidade
prazo: data limite para inscrição
descricao: informações e requisitos
Os dados ficam salvos no arquivo database.sqlite na raiz do projeto.

Como Executar:
Instalar as dependências:

    Bash
    npm install

Iniciar o servidor:
    Bash
    npm start
    O servidor está disponível em: http://localhost:3000

Modo desenvolvimento: npm run dev

Rodar os testes: npm test

Rotas:
GET / — Página inicial
GET /saude — Verificação do servidor
GET /oportunidades — Listagem das oportunidades
GET /oportunidades/:id — Detalhes de uma oportunidade

Estrutura dos diretórios:
app.js: configurações, middlewares e rotas
server.js: banco e inicialização do servidor
models/: modelos do Sequelize
routes/: rotas da aplicação
views/: páginas e layouts em Handlebars
public/: arquivos estáticos (CSS)
test/: testes automatizados