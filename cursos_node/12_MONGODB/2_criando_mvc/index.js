/**
 * MONGODB - ESTRUTURA MVC BÃSICA COM ROTAS
 * =========================================
 * Exemplo de aplicação MongoDB com estrutura MVC
 * Separa o código em Models (dados), Controllers (lógica) e Rotas
 */

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

// Executa a conexão com MongoDB
const conn = require('./db/conn').run

// Importa as rotas (endpoints) da aplicação
const productsRoutes = require('./routes/productsRoutes')

// Configuração do motor de templates Handlebars
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Middleware: processa dados de formulários
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware: processa dados JSON
app.use(express.json())

// Middleware: serve arquivos estáticos (CSS, JS, imagens)
app.use(express.static('public'))

// Inclui as rotas de produtos na aplicação
app.use('/', productsRoutes)

// Inicia o servidor na porta 3000
app.listen(3000)
console.log('\x1b[32m✓ Servidor rodando em http://localhost:3000\x1b[0m')
