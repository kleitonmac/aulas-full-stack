// ========================================
// SEQUELIZE - DELETANDO DADOS (DELETE/DESTROY)
// ========================================
// Este arquivo demonstra como REMOVER registros do banco usando Sequelize.
// A operação DESTROY deleta um ou mais registros da tabela.

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

// Rota GET / - lista todos os usuários
app.get('/', function (req, res) {
  User.findAll({ raw: true })
    .then((users) => {
      console.log(users)
      res.render('home', { users: users })
    })
    .catch((err) => console.log(err))
})

app.get('/users/create', function (req, res) {
  res.render('adduser')
})

app.post('/users/create', function (req, res) {
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  }

  User.create({ name, occupation, newsletter })
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
})

app.get('/users/:id', function (req, res) {
  const id = req.params.id

  User.findOne({
    raw: true,
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log(user)
      res.render('userview', { user })
    })
    .catch((err) => console.log(err))
})

// Rota POST /users/delete/:id - DELETA um usuário
app.post('/users/delete/:id', function (req, res) {
  const id = req.params.id

  // User.destroy() - OPERAÇÃO DELETE do CRUD
  // where: { id: id } - especifica qual registro deletar
  User.destroy({
    where: {
      id: id, // Deleta o usuário com este ID
    },
  })
    .then((user) => {
      res.redirect('/') // Redireciona para a lista após deletar
    })
    .catch((err) => console.log(err))
})

// Sincroniza e inicia o servidor
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
