/**
 * MONGODB - INSERINDO DADOS
 * =========================
 * Demonstra como criar e inserir documents (registros) no MongoDB
 * Exemplifica operações de CREATE (C do CRUD)
 */

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

// Conecta ao MongoDB
const conn = require('./db/conn').run

// Importa as rotas que contém os endpoints
const productsRoutes = require('./routes/productsRoutes')

// Configura Handlebars para renderizar templates HTML
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Middleware para processar dados de formulários POST
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware para processar JSON
app.use(express.json())

// Middleware para servir arquivos estáticos
app.use(express.static('public'))

// Define as rotas da aplicação
app.use('/', productsRoutes)

// Inicia o servidor
app.listen(3000)
console.log('\x1b[32m✓ Servidor rodando em http://localhost:3000\x1b[0m')
