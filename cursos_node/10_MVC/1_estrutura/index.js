// ========================================
// ARQUITETURA MVC - ESTRUTURA BASE
// ========================================
// Este arquivo demonstra a estrutura base de uma aplicação MVC (Model-View-Controller).
// MVC é um padrão arquitetônico que separa a aplicação em 3 camadas:
// - Model: interage com o banco de dados
// - View: apresenta os dados ao usuário (templates HTML)
// - Controller: processa a lógica e conecta Model com View

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// Importa a configuração do banco de dados
const conn = require('./db/conn')

// Configura o Handlebars como template engine (View)
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

// Serve arquivos estáticos
app.use(express.static('public'))

// Inicia o servidor na porta 3000
app.listen(3000)
