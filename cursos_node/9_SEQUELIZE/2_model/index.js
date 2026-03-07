// ========================================
// SEQUELIZE - DEFININDO MODELS (MODELOS)
// ========================================
// Este arquivo demonstra como criar um model (modelo) no Sequelize.
// Um modelo representa uma tabela do banco de dados e define seus campos.

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// Importa a conexão com o banco de dados
const conn = require('./db/conn')

// Importa o model User (tabela de usuários)
const User = require('./models/User')

// Configura o Handlebars como template engine
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

// Rota GET / - exibe a página inicial
app.get('/', function (req, res) {
  res.render('home')
})

// Sincroniza os models com o banco de dados
// O .sync() cria as tabelas se elas não existirem
// Depois inicia o servidor na porta 3000
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
