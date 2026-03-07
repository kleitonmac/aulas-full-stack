// ========================================
// SEQUELIZE - INSERINDO DADOS (CREATE)
// ========================================
// Este arquivo demonstra como INSERIR dados no banco usando Sequelize.
// A operação CREATE adiciona um novo registro à tabela.

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const User = require('./models/User')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

// Rota GET / - exibe a página inicial
app.get('/', function (req, res) {
  res.render('home')
})

// Rota GET /users/create - exibe o formulário de criação de usuário
app.get('/users/create', function (req, res) {
  res.render('adduser')
})

// Rota POST /users/create - processa o envio do formulário
app.post('/users/create', function (req, res) {
  // Extrai os dados do formulário
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  // Converte o checkbox em booleano (se estiver "on", é verdadeiro)
  if (newsletter === 'on') {
    newsletter = true
  }

  // User.create() - OPERAÇÃO CREATE do CRUD
  // Insere um novo registro na tabela Users com os dados fornecidos
  User.create({ name, occupation, newsletter })

  // Redireciona para a página inicial após inserção
  res.redirect('/')
})

// Sincroniza os models e inicia o servidor
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
