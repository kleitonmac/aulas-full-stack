// ========================================
// SEQUELIZE - INSTALAÇÃO E CONFIGURAÇÃO
// ========================================
// Este arquivo demonstra a instalação e configuração básica do Express com Sequelize.
// O Sequelize é um ORM (Object-Relational Mapping) que permite interagir com banco de dados de forma orientada a objetos.

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// Importa a configuração do Sequelize (conexão com banco de dados)
const conn = require('./db/conn')

// Configura o Handlebars como template engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Middleware para processar dados de formulários (application/x-www-form-urlencoded)
app.use(
  express.urlencoded({
    extended: true, // Permite parse de dados complexos
  }),
)

// Middleware para processar JSON
app.use(express.json())

// Serve arquivos estáticos (CSS, JS, imagens) da pasta public
app.use(express.static('public'))

// Rota GET / - exibe a página inicial (home)
app.get('/', function (req, res) {
  res.render('home')
})

// Inicia o servidor na porta 3000
app.listen(3000)
