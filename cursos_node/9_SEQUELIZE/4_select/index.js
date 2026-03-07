// ========================================
// SEQUELIZE - SELECIONANDO DADOS (READ/FINDALL)
// ========================================
// Este arquivo demonstra como BUSCAR/LISTAR dados do banco usando Sequelize.
// A operação FINDALL retorna todos os registros da tabela.

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

// Rota GET / - exibe a página inicial com lista de usuários
app.get('/', function (req, res) {
  // User.findAll() - OPERAÇÃO READ do CRUD
  // { raw: true } retorna um array de objetos simples (mais rápido)
  User.findAll({ raw: true })
    .then((users) => {
      console.log(users) // Exibe os usuários no console
      res.render('home', { users: users }) // Envia os usuários para a view
    })
    .catch((err) => console.log(err))
})

// Rota GET /users/create - exibe o formulário de criação
app.get('/users/create', function (req, res) {
  res.render('adduser')
})

// Rota POST /users/create - INSERE um novo usuário
app.post('/users/create', function (req, res) {
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  }

  User.create({ name, occupation, newsletter })

  res.redirect('/')
})

// Sincroniza e inicia o servidor
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
