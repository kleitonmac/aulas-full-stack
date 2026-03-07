/**
 * MONGODB - LENDO/RESGATANDO DADOS
 * ================================
 * Demonstra como buscar e recuperar documents do MongoDB
 * Exemplifica operações de READ (R do CRUD)
 * Mostra como exibir todos os registros e buscar por específicos
 */

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

// Conecta ao banco de dados MongoDB
const productsRoutes = require('./routes/productsRoutes')

// Configura o motor de templates Handlebars
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Middleware para processar dados de formulários
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware para processar JSON
app.use(express.json())

// Middleware para servir arquivos estáticos
app.use(express.static('public'))

// Registra as rotas da aplicação
app.use('/', productsRoutes)

// Inicia o servidor na porta 3000
app.listen(3000)
console.log('\x1b[32m✓ Servidor rodando em http://localhost:3000\x1b[0m')
